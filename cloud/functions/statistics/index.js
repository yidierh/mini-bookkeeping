/**
 * @author yidier
 * @date 2020-03-23
 * @email yidierh@gmail.com
 */
const common = require('./common')

const cloud = require('wx-server-sdk')

cloud.init({
    env: '' // 这里要填你的环境id 不然默认选第一个
})

const db = cloud.database()
const _ = db.command

const $ = _.aggregate

// day_record
const RECORD = db.collection('record')

const DAY_RECORD = db.collection('day_record')

const MONTH_RECORD = db.collection('month_record')

const USER = db.collection('user')

/**
 * 统计昨日收入支出
 * @param type 0：支出 / 1：收入
 * @param status day：昨日 / month：上月
 * @param oppenid 用户标识
 */
const sumMoney = async (type, status, openid) => {

    const {queryStart, queryEnd} = getDay(status)

    try {
        const {list} = await RECORD.aggregate()
            .addFields({
                matched: $.and([$.gte(['$date', queryStart]), $.lte(['$date', queryEnd])])
            })
            .match({
                matched: true,
                type: type,
                _openid: openid
            })
            .group({
                _id: null,
                total_money: $.sum('$money')
            })
            .end()

        if (list.length) return list[0].total_money

        else return 0

    } catch (e) {
        throw e
    }
}

/**
 * 获取昨天今天
 * @params status: day / month / 为空的话，判断今天是不是本月第一天
 * @return {{yesterday: Date, today: Date}}
 */
const getDay = (status) => {

    const date = new Date()
    const y = date.getFullYear()
    const m = date.getMonth()
    const d = date.getDate()

    if (status) {
        return {
            queryStart: $.dateFromString({
                dateString: status === 'day' ? new Date(y, m, d - 1).toJSON() : new Date(y, m - 1, 1).toJSON()
            }),
            queryEnd: $.dateFromString({
                dateString: status === 'day' ? new Date(y, m, d).toJSON() : new Date(y, m, 0).toJSON()
            })
        }
    } else {
        // 今天的时间戳
        let today = new Date().getTime()
        let month_day_start = new Date(y, m, 1, 0, 0, 0, 0).getTime()
        let month_day_end = new Date(y, m, 1, 23, 59, 59, 59).getTime()

        return today >= month_day_start && today <= month_day_end
    }
}

/**
 * 统计金额
 * @param status： day / month
 * @return {Promise<unknown[]>}
 */
const sumAll = (status, openid, accept) => {

    return Promise.all([sumMoney(0, status, openid), sumMoney(1, status, openid)]).then(async res => {
        try {

            // pay - income
            const _Date = new Date()
            let data = {
                _openid: openid,
                income: res[1],
                pay: res[0],
                sum: res[0] - res[1]
            }


            if (status === 'day') {

                data['date'] = new Date(_Date.getFullYear(), _Date.getMonth(), _Date.getDate() -1) // 设置日期为上月的
                await DAY_RECORD.add({
                    data: {...data}
                })

                if (accept) {
                    data['date'] = new Date(_Date.getFullYear(), _Date.getMonth(), _Date.getDate(), 9,0,0) // 设置日期为上月的
                    await sendMessage(accept, {...data})
                }
            } else {

                data['date'] = new Date(_Date.getFullYear(), _Date.getMonth() - 1) // 设置日期为上月的

                await MONTH_RECORD.add({
                    data: {...data}
                })
            }

        } catch (e) {
            throw e
        }
    })
}


/**
 * 发送订阅消息
 * @param isAccept
 * @return {Promise<any>}
 */
const sendMessage = async (isAccept, {_openid, income, pay, sum, date}) => {
    try {
        const {data} = await cloud.openapi.subscribeMessage.getTemplateList({})
        if (data.length) {
            const result = await cloud.openapi.subscribeMessage.send({
                touser: _openid,
                page: 'pages/start/index',
                data: {
                    amount4: {
                        value: income + '元'
                    },
                    amount5: {
                        value: pay + '元'
                    },
                    amount10: {
                        value: sum + '元'
                    },
                    thing9: {
                        value: '昨日账单'
                    },
                    date12: {
                        value: common.dateFormat("YYYY-mm-dd HH:MM:SS", date)
                    }
                },
                templateId: data[0].priTmplId // 目前只有一个订阅消息，后期要加这里记得改
            })
            return result
        }
    } catch (e) {
        if (e.errCode === 43101) { // 用户拒收
            await USER.where({_openid: _openid}) // 更新该用户授权状态
                .update({
                    data: {
                        accept_message: false
                    }
                })
            throw `${_openid} 用户拒收了`
        } else {
            throw e
        }
    }
}

/**
 * 获取所有用户
 * @return {Promise<void>}
 */

const sumUserAll = async () => {
    try {
        const {data} = await USER.get()
        const isFirstDay = getDay()
        if (data.length) {
            for (let i = 0; i < data.length; i++) {
                if (isFirstDay) {
                    await sumAll('month', data[i]._openid)
                }
                await sumAll('day', data[i]._openid, data[i].accept_message)
            }
        }
    } catch (e) {
        throw e
    }
}

exports.main = async () => {
    try {
        await sumUserAll()
    } catch (e) {
        console.log(e)
    }
}
