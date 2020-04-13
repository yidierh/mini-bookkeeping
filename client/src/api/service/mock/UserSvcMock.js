/**
 * Created by Henry Huang on 2020/4/13.
 */
import UserSvc from "../UserSvc";

class UserSvcMock extends UserSvc {

  async isNewUser() {
    return super.isNewUser();
  }

  async addUser() {
    return super.addUser();
  }

  async getUser() {
    return super.getUser();
  }

  async updateUserMessageAccept() {
    return super.updateUserMessageAccept();
  }
}

export default UserSvcMock
