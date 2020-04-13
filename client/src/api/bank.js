/**
 * @Description: 银行接口
 * @author yidierh
 * @email yidierh@gmail.com
 * @date 2020-02-29
 */
import { isMock } from '../../config.json'
import BankSvcMock from "./service/mock/BankSvcMock";
import BankSvc from "./service/BankSvc";

/**
 * 获取银行列表
 * @returns {Promise<void>}
 */
export const getBank = isMock ? new BankSvcMock().getBank : new BankSvc().getBank
