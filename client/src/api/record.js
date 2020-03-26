/**
 * @Description: 记账的接口
 * @author yidierh
 * @email yidierh@gmail.com
 * @date 2020-02-29
 */
import {get as getGlobalData} from 'utils/global'
import {monthFirstAndLast} from "../utils";
import Taro from '@tarojs/taro'

const db = Taro.cloud.database()
const RECORD = db.collection('record')
const MONTH_RECORD = db.collection('month_record')
const DAY_RECORD = db.collection('day_record')

const _ = db.command
const $ = _.aggregate

/**
 * 添加消费记录
 * @param type 0 支出 1 收入
 * @param bank_type
 * @param money
 * @param description
 * @param date
 */
export const addRecord = ({type, bank_type, money, description, date = new Date()}) => {
  try {
    const re = /((^[1-9]\d*)|^0)(\.\d{0,2}){0,1}$/
    if (!money || !re.test(money)) {
      throw ('消费金额不正确')
    } else {
      RECORD.add({data: {type, bank_type, money, description, date}})
    }
  } catch (e) {
    throw (e)
  }
}

/**
 * 获取消费历史列表
 * @returns {Promise<Taro.DB.Query.IQueryResult>}
 */
export const getRecordHistory = async () => {
  try {
    const {openid} = await getGlobalData('cloudData')
    const { list } = await RECORD.aggregate().match({_openid: openid}).sort({date: -1}).end()
    return list
  } catch (e) {
    throw e
  }
}

/**
 * 获取消费详情
 * @param _id
 * @returns {Promise<void>}
 */
export const getRecord = async ({_id}) => {
  try {
    const res = await RECORD.where({_id}).get()
    return res.data[0]
  } catch (e) {
    throw e
  }
}

/**
 * 更新消费详情
 * @param _id
 * @return {Promise<void>}
 */
export const updateRecord = async ({_id, type, bank_type, money, description}) => {
  try {
    await RECORD.where({_id}).update({data: {type, bank_type, money, description}})
  } catch (e) {
    throw e
  }
}

/**
 * 删除记录
 * @param _id
 * @return {Promise<void>}
 */
export const deleteRecord = async ({_id}) => {
  try {
    await RECORD.where({_id}).remove()
  } catch (e) {
    throw e
  }
}

/**
 * 统计 ================================================>
 */

/**
 * 获取当月总支出/收入
 * @param type 0 支出 / 1 收入
 * @returns {Promise<void>}
 */
export const getMonthSum = async (type) => {
  const {openid} = await getGlobalData('cloudData')
  const {first_day, last_day} = monthFirstAndLast(new Date().getMonth() + 1)

  const res =
    await RECORD
      .where({
        date: _.and(_.gte(first_day), _.lte(last_day)),
        type: _.eq(type),
        _openid: openid
      })
      .get()

  return sumMonthMoney(res.data)

}

/**
 * 统计钱
 * @param arr
 * @returns {*}
 */
const sumMonthMoney = (arr) => {
  return arr.reduce((acc, cur) => {
    return acc + cur.money
  }, 0)
}

/**
 * 获取当年每月的总消费 / 当月每天消费
 * @params type：day / year
 */
export const getEveryMonthOrDay = async (type) => {
  const {openid} = await getGlobalData('cloudData')

  let _collection = {
    year: MONTH_RECORD,
    day: DAY_RECORD
  }

  let _matched = ''
  if (type === 'year') {
    const {first_day} = monthFirstAndLast(1) // 大于一月的全部数据
    _matched = $.gte(['$date', dateFromString(first_day)])
  } else {
    const _date = new Date()
    const {first_day, last_day} = monthFirstAndLast(_date.getMonth() + 1)
    _matched = $.and([$.gte(['$date', dateFromString(first_day)]), $.lte(['$date', dateFromString(last_day)])])
  }

  try {
    const {list} = await _collection[type]
      .aggregate()
      .addFields({
        matched: _matched
      })
      .match({
        matched: true,
        _openid: openid
      })
      .sort({
        date: 1
      })
      .project({
        x_date: $.dateToString({
          date: '$date',
          format: `%Y-%m${type !== 'year' ? '-%d' : ''}`,
          timezone: 'Asia/Shanghai'
        }),
        income: '$income',
        pay: '$pay',
        sum: '$sum'
      })
      .end()
    return list
  } catch (e) {
    throw e
  }
}

/**
 * 获取当月每天消费
 * @return {Promise<void>}
 */
export const getEveryDay = async () => {
  const {openid} = await getGlobalData('cloudData')
  const {first_day} = monthFirstAndLast(1)
  try {
    const {list} = await MONTH_RECORD
      .aggregate()
      .addFields({
        matched: $.gte(['$date', dateFromString(first_day)])
      })
      .match({
        matched: true,
        _openid: openid
      })
      .sort({
        date: 1
      })
      .project({
        month: $.dateToString({
          date: '$date',
          format: '%Y-%m',
          timezone: 'Asia/Shanghai'
        }),
        income: '$income',
        pay: '$pay',
        sum: '$sum'
      })
      .end()
    return list
  } catch (e) {
    throw e
  }
}

/**
 * 获取上月总支出
 * @return {Promise<void>}
 */
export const getLastSum = async () => {
  const {openid} = await getGlobalData('cloudData')
  const {first_day, last_day} = monthFirstAndLast(new Date().getMonth())
  try {
    const {data} = await MONTH_RECORD
      .where({
        date: _.and([_.gte(first_day), _.lte(last_day)]),
        _openid: _.eq(openid)
      })
      .get()
    return data.length ? data[0].sum : 0
  } catch (e) {
    throw e
  }
}

function dateFromString(date) {
  return $.dateFromString({
    dateString: new Date(date).toJSON()
  })
}
