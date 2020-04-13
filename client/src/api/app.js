/**
 * @author yidier
 * @date 2020-03-25
 * @email yidierh@gmail.com
 * @description 一些系统参数
 */
import AppSvc from "./service/AppSvc";
import AppSvcMock from "./service/mock/AppSvcMock";
import { isMock } from "../../config.json";

export const getAppData = isMock ? new AppSvcMock().getAppData : new AppSvc().getAppData
