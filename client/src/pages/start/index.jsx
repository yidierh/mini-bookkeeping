/**
 * @Description: 欢迎页
 * @author yidierh
 * @email yidierh@gmail.com
 * @date 2020-02-24
 */
import * as config from '../../../../config.json'
import Taro, {Component} from '@tarojs/taro'
import {View, Text, Image} from '@tarojs/components'
import { AtButton } from 'taro-ui'
import { isNewUser } from 'api/user'
import { set as setGlobalData, get as getGloablData } from 'utils/global'

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

    const res = await Taro.requestSubscribeMessage({tmplIds: [...config.tmplIds]})

    const cloudData = await getGloablData('cloudData')

    if (res.errMsg === 'requestSubscribeMessage:ok') {
      Taro.cloud
        .callFunction({
          name: "message",
          data: {
            openId: cloudData.openid,
            templateId: [...config.tmplIds][0]
          }
        })
        .then(res => {
          console.log(res)
        })
    }

    try {
      // 判断是否登陆过
      const _isNew = await isNewUser()
      const wxUserInfo = Taro.getStorageSync('wxUserInfo')
      if (wxUserInfo && !_isNew) {
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
        <View className={`start-container-hello ${isFirst ? 'fade-out' : ''}`}
          style={{visibility: `${isFirst ? '' : 'hidden'}`}}
        >
          <Text className='start-container-hello-text'> {config.appName} </Text>
        </View>
        <View className='start-container-main'>
          <Image src={require('images/start/start.png')} className='start-container-main-img' width='100%'
            height='100%'
          />
          <Text className='start-container-main-title'> 开始记账 </Text>
          <Text className='start-container-main-text'> 如果要开始，请按一下按钮下面开始 </Text>
          <View className='start-container-main-btn' >
            <AtButton type='primary' onClick={this.start}> 开始 </AtButton>
          </View>
        </View>
      </View>
    )
  }
}
