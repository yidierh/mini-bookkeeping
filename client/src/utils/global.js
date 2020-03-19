/**
 * @Description: 全局变量
 * @author yidierh
 * @email yidierh@gmail.com
 * @date 2020-02-26
 */
const globalData = {
  isFirst: true,
  isUpdate: false,
  wxUserInfo: null,
  cloudData: null
}

export function set(key, val) {
  return new Promise(resolve => {
    globalData[key] = val
    resolve()
  })
}

export function get(key) {
  return new Promise((resolve) => {
    resolve(globalData[key])
  })
}
