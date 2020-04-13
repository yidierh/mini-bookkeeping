/**
 * Created by Henry Huang on 2020/4/13.
 */
import Taro from '@tarojs/taro'
import {get as getGlobalData, set as setGlobalData} from './../../utils/global'

class BankSvc {

  async getBank () {
    const db = Taro.cloud.database()
    const BANK = db.collection('bank')
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

}

export default BankSvc
