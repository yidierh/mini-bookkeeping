const cloud = require('wx-server-sdk')

cloud.init()

console.log('2',process.env)

exports.main = async () => {
  const wxContext = cloud.getWXContext()

  return {
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}
