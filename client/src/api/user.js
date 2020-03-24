/**
 * @Description: 用户表
 * @author yidierh
 * @email yidierh@gmail.com
 * @date 2020-02-26
 */

import {get as getGlobalData} from 'utils/global'
import Taro from "@tarojs/taro";

const db = Taro.cloud.database()
const USER = db.collection('user')

/**
 * 判断是否新用户
 * @returns {Promise<number>}
 */
export const isNewUser = async () => {

  try {
    const {openid} = await getGlobalData('cloudData')

    const _userArr = await USER.where({_openid: openid}).get()

    return !_userArr.data.length

  } catch (e) {
    throw new Error(e)
  }

}

/**
 * 新建用户
 * @param params
 * @returns {Promise<void>}
 */
export const addUser = async (params) => {
  try {
    await USER.add({data: {...params}})
  } catch (e) {
    throw (e)
  }
}

/**
 * 获取用户信息
 * @returns {Promise<Taro.DB.Document.IDocumentData[]>}
 */
export const getUser = async () => {
  try {
    const {openid} = await getGlobalData('cloudData')

    const _userArr = await USER.where({_openid: openid}).get()

    return _userArr.data[0]

  } catch (e) {
    throw (e)
  }
}

/**
 * 更新用户订阅消息授权状态
 * @param status
 */
export const updateUserMessageAccept = async (status) => {
  try {
    const {openid} = await getGlobalData('cloudData')
    await USER.where({_openid: openid}).update({
      data: {
        accept_message: status
      }
    })
  } catch (e) {
    throw e
  }
}
