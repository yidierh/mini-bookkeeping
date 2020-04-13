/**
 * Created by Henry Huang on 2020/4/13.
 */
import Taro from "@tarojs/taro";

class AppSvc {

  async getAppData() {
    try {
      const db = Taro.cloud.database()
      const APP = db.collection('app')
      const { data } = await APP.get()
      return data[0]
    } catch (e) {
      throw e
    }
  }

}

export default AppSvc;
