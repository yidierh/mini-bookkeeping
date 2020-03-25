/**
 * @author yidier
 * @date 2020-03-25
 * @email yidierh@gmail.com
 * @description 一些系统参数
 */
import Taro from "@tarojs/taro";

const db = Taro.cloud.database()
const APP = db.collection('app')

export const getAppData = async () => {
  try {
    const { data } = await APP.get()
    return data[0]
  } catch (e) {
    throw e
  }
}
