/**
 * Created by Henry Huang on 2020/4/13.
 */
import AppSvc from "../appSvc";

class AppSvcMock extends AppSvc {

  async getAppData () {
    try {
      return { }
    } catch (e) {
      throw e
    }
  }

}

export default AppSvcMock
