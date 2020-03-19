/**
 * @Description: 银行接口
 * @author yidierh
 * @email yidierh@gmail.com
 * @date 2020-02-29
 */

import Taro from '@tarojs/taro'
import {get as getGlobalData, set as setGlobalData} from 'utils/global'

const db = Taro.cloud.database()
const BANK = db.collection('bank')


/**
 * 获取银行列表
 * @returns {Promise<void>}
 */
export const getBank = async () => {
  let bank_data = await getGlobalData('bank_list')
  try {
    if (!bank_data) {
      const res = await BANK.get()
      bank_data = res.data.length ? res.data[0].bank : {}
      await setGlobalData('bank_data', bank_data)
    }
    return bank_data
  } catch (e) {
    throw e
  }
}
