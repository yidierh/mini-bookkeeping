/**
 * Created by Henry Huang on 2020/4/13.
 */
import RecordSvc from "../RecordSvc";

class RecordSvcMock extends RecordSvc {

  addRecord() {
    super.addRecord();
  }

  async getRecordHistory() {
    super.getRecordHistory();
  }

  async getRecord() {
    super.getRecord();
  }

  async updateRecord() {
    super.updateRecord();
  }

  async deleteRecord() {
    super.deleteRecord();
  }

  async getMonthSum() {
    super.getMonthSum();
  }

  async getEveryMonthOrDay() {
    super.getEveryMonthOrDay();
  }

  async getEveryDay() {
    super.getEveryDay();
  }

  async getLastSum() {
    super.getLastSum();
  }
}

export default RecordSvcMock
