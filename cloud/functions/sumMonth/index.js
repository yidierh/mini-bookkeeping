/**
 * @author yidier
 * @date 2020-03-09
 * @email yidierh@gmail.com
 */
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
const _ = db.command

const $ = _.aggregate
// month_record
const RECORD = db.collection('record')

const MONTH_RECORD = db.collection('month_record')

/**
 * 统计每月收入支出
 * @param type 0：支出 / 1：收入
 */
const sumMonth = async (type) => {
    const {first_day, last_day} = monthFirstAndLast('last')

    try {
        const {list} = await RECORD.aggregate()
            .addFields({
                matched: $.and([$.gte(['$date', first_day.toDateString()]), $.lte(['$date', last_day.toDateString()])])
            })
            .match({
                matched: true,
                type: type
            })
            .group({
                _id: null,
                total_money: $.sum('$money')
            })
            .end()

        if (list.length) return list[0].total_money

        else return 0

    } catch (e) {
        console.log(e)
    }
}

/**
 * 统计金额
 * @return {Promise<any[]>}
 */
const sumAll = () => {
    return Promise.all([sumMonth(0), sumMonth(1)]).then(async res => {
        try {
            await MONTH_RECORD.add({
                data: {
                    date: new Date(),
                    income: res[0],
                    pay: res[1],
                    sum: res[0] * -1 + res[1]
                }
            })
        } catch (e) {
            console.log(`err: ${e}`)
        }
    })
}

/**
 * 获取当月第一天和最后天
 * @param type now: 本月 / last: 上一月
 * @return {{second_day: Date, last_day: Date, first_day: Date}}
 */
const monthFirstAndLast = (type) => {
    const date = new Date()
    const y = date.getFullYear()
    const m = date.getMonth()

    return {
        first_day: new Date(y, type === 'now' ? m : m - 1, 1),
        second_day: new Date(y, type === 'now' ? m : m - 1, 2),
        last_day: new Date(y, type === 'now' ? m + 1 : m, 0)
    }
}

exports.main = async () => {
    await sumAll()
    return null
}

