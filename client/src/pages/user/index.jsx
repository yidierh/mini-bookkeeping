/**
 * @Description: 个人中心
 * @author yidierh
 * @email yidierh@gmail.com
 * @date 2020-02-25
 */
import { set as setGlobalData } from 'utils/global'
import {getUser} from 'api/user'
import Taro, {Component} from '@tarojs/taro'

import {View} from '@tarojs/components'
import UserLoading from './userLoading'
import UserInfo from './userInfo'

import './index.scss'

export default class User extends Component {

  config = {
    navigationBarTitleText: '个人中心',
    navigationBarBackgroundColor: '#FAFAFA',
    backgroundColor: '#FAFAFA'
  }

  constructor() {
    super(...arguments)
    this.state = {
      userInfo: null,
      loading: true
    }
  }

  componentWillMount() {
    this.fetchData()
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
  fetchData = () => {
    Promise.all([getUser()]).then(res => {
      this.setState({userInfo: {...res[0]}, loading: false})
    })
  }

  openSetting = () => {
    Taro.openSetting({})
  }

  logOut = async () => {
    try {
      await setGlobalData('isFirst', true)
      Taro.clearStorageSync()
      Taro.redirectTo({url: '/pages/start/index'})
    } catch(e) {
      console.log(e)
    }
  }

  goAbout = () => {
    Taro.navigateTo({url: '/pages/about/index'})
  }

  render() {
    const {loading, userInfo} = this.state
    return (
      <View className='user-container'>
        {
          loading ?
          <UserLoading/> :
          <UserInfo userInfo={userInfo}
                    openSetting={this.openSetting}
                    logOut={this.logOut}
                    goAbout={this.goAbout}/>
        }
      </View>
    )
  }
}
