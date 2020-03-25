/**
 * @Description: 登陆页
 * @author yidierh
 * @email yidierh@gmail.com
 * @date 2020-02-24
 */
import * as config from '../../../../mini.config.json'
import Taro, {Component} from '@tarojs/taro'
import {View, Text} from '@tarojs/components'
import {AtButton, AtMessage} from 'taro-ui'

import { isNewUser } from 'api/user'

import { set as setGlobalData } from 'utils/global'

import './index.scss'

export default class Login extends Component {

  config = {
    navigationBarTitleText: '登陆'
  }

  constructor(props) {
    super(props)
    this.getUserInfoHandler = this.getUserInfoHandler.bind(this)
  }

  componentWillMount() {
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  componentDidShow() {
  }

  componentDidHide() {
  }

  // methods
  getUserInfoHandler = async (e) => {
    // 成功
    if (e.detail.userInfo) {
      try {
        await setGlobalData('wxUserInfo', e.detail.userInfo)

        Taro.setStorageSync('wxUserInfo', e.detail.userInfo)

        // 判断是不是新用户
        const _isNew = await isNewUser()
        if (_isNew) {
          Taro.redirectTo({ url: `/pages/register/index` })
        } else {
          // 在首页还没完成前
          Taro.switchTab({ url: `/pages/home/index` })
        }
      } catch (e) {
        console.log(e)
      }
    } else {
      Taro.atMessage({
        'message': '允许授权才可以继续使用哦',
        'type': 'error',
      })
    }
  }

  render() {
    return (
      <View className='login-container'>
        <AtMessage />
        <Text className='login-container-title'> {config.appName} </Text>
        <Text className='login-container-text'> 欢迎您， </Text>
        <Text className='login-container-sub'> 继续前进 </Text>
        <View className='login-container-icon-wrap'>
          <View className='at-icon icon-wechat login-container-icon-wrap-content' />
        </View>
        <AtButton type='primary' openType='getUserInfo' onGetUserInfo={this.getUserInfoHandler}>点击微信授权</AtButton>
      </View>
    )
  }
}
