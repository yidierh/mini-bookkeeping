/**
 * @author yidier
 * @date 2020-03-23
 * @email yidierh@gmail.com
 */
const cloud = require('wx-server-sdk')
cloud.init()
exports.main = async (event, context) => {
    try {
        await cloud.openapi.subscribeMessage.send({
            touser: event.openId,
            page: 'index',
            data: {
                amount4: {
                    value: '339208499'
                },
                amount5: {
                    value: '200'
                },
                date1: {
                    value: '2018-01-01'
                },
                date12: {
                  value: '2020-01-01 12:12:12'
                }
            },
            templateId: event.templateId
        });
        return result
    } catch (err) {
        console.log(err)
        return err
    }
}
