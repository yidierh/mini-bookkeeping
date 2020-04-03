/**
 * @Description: 欢迎页
 * @author yidierh
 * @email yidierh@gmail.com
 * @date 2020-02-24
 */
import Taro, {Component} from '@tarojs/taro'
import {View, Text, Image} from '@tarojs/components'
import {AtButton, AtMessage} from 'taro-ui'
import {isNewUser, updateUserMessageAccept} from 'api/user'
import {set as setGlobalData} from 'utils/global'

import './index.scss'

export default class Start extends Component {

  config = {
    navigationBarTitleText: 'EasyCost'
  }

  constructor(props) {
    super(props);
    this.state = {
      isFirst: true
    }
  }

  componentWillMount() {
    this.getLogin()
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  componentDidShow() {
    const {isFirst} = this.state;
    if (isFirst) {
      setTimeout(() => {
        this.setState({'isFirst': false})
      }, 1500)
    }
  }

  componentDidHide() {
  }

  // methods
  getLogin = () => { // 登陆云数据库的
    Taro.cloud
      .callFunction({
        name: "login",
        data: {}
      })
      .then(res => {
        setGlobalData('cloudData', res.result)
      })
  }

  start = async () => {
    // 订阅消息授权
    let authorize = {}
    Taro.requestSubscribeMessage({tmplIds: [...TEMPL_IDS]}).then(async res => {
      authorize = res[TEMPL_IDS[0]]
      this.next(authorize)
    }).catch(async err => {
      if (err.errCode === 20004) {
        // 关闭了提示
        Taro.atMessage({
          'message': '您已关闭订阅消息，若要接收请在小程序设置里面打开',
          'type': 'warning',
          'duration': 1500
        })
        setTimeout(() => {
          this.next()
        }, 1500)
      }
    })
  }

  next = async (authorize) => {
    try {
      // 判断是否登陆过
      const _isNew = await isNewUser()
      const wxUserInfo = Taro.getStorageSync('wxUserInfo')
      if (wxUserInfo && !_isNew) {
        await updateUserMessageAccept(authorize && authorize === 'accept' ? true : false) // 更新订阅消息授权状态
        // 登陆过了跳首页
        Taro.switchTab({url: '/pages/home/index'})
      } else {
        Taro.navigateTo({url: '/pages/login/index'})
      }
    } catch (e) {
      console.log(e)
    }
  }

  render() {
    const {isFirst} = this.state;
    return (
      <View className='start-container'>
        <AtMessage/>
        <View className={`start-container-hello ${isFirst ? 'fade-out' : ''}`}
              style={{visibility: `${isFirst ? '' : 'hidden'}`}}
        >
          <Text className='start-container-hello-text'> {APP_NAME} </Text>
        </View>
        <View className='start-container-main'>
          <Image src={require('images/start/start.png')} className='start-container-main-img' width='100%'
                 height='100%'
          />
          <Text className='start-container-main-title'> 开始记账 </Text>
          <Text className='start-container-main-text'> 如果要开始，请按一下按钮下面开始 </Text>
          <View className='start-container-main-btn'>
            <AtButton type='primary' onClick={this.start}> 开始 </AtButton>
          </View>
        </View>
      </View>
    )
  }
}
