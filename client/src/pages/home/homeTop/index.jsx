/**
 * @Description: 用户显示用户信息
 * @author yidierh
 * @email yidierh@gmail.com
 * @date 2020-02-27
 */
import Taro, {Component} from '@tarojs/taro'
import {AtAvatar} from 'taro-ui'
import {View, Text} from '@tarojs/components'

import './index.scss'

export default class HomeTop extends Component {

  config = {
    component: true
  }

  constructor() {
    super(...arguments)
    this.state = {
      userInfo: {
        avatarUrl: null
      }
    }
  }

  componentWillMount() {
    this.getUserInfo()
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
  getUserInfo = () => {
    try {
      const wxUserInfo = Taro.getStorageSync('wxUserInfo')
      this.setState({
        userInfo: wxUserInfo
      })
    } catch (e) {
      console.log(e)
    }
  }

  render() {
    const {userInfo} = this.state
    return (
      <View className='home-top-container at-row'>
        <View>
          <AtAvatar image={userInfo.avatarUrl} size='large' circle />
        </View>
        <View className='home-top-container-right'>
          <Text className='home-top-container-right-title'>Hi, {userInfo.nickName}</Text>
          <Text className='home-top-container-right-sub'> 欢迎你 </Text>
        </View>
      </View>
    )
  }
}
