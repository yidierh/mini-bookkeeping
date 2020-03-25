/**
 * @Description: 用户信息展示
 * @author yidierh
 * @email yidierh@gmail.com
 * @date 2020-02-25
 */
import Taro, {Component} from '@tarojs/taro'
import {View, Text} from '@tarojs/components'
import {AtAvatar, AtIcon, AtButton} from 'taro-ui'
import './index.scss'

class UserInfo extends Component {

  static defaultProps = {
    userInfo: {
      avatar_url: '',
      nick_name: null,
      email: null,
      phone: null,
      birthday: null
    }
  }

  constructor(props) {
    super(props);
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

  render() {
    const {userInfo, openSetting, logOut, goAbout} = this.props
    return (
      <View className='user-info-container'>
        <View className='user-info-container__top'>
          <View className='user-info-container__top-avatar'>
            <AtAvatar size='large' circle image={userInfo.avatar_url}/>
          </View>
          <Text className='user-info-container__top-name'> {userInfo.nick_name} </Text>
        </View>
        <View className='user-info-container__contact user-info-container__contact-first'>
          <Text className='user-info-container-title'>信息</Text>
          <View className='user-info-container__contact-item'>
            <AtIcon prefixClass='icon' value='mail' size='15' color='#BABABA'/>
            <View className='user-info-container__contact-item__right'>
              <Text className='user-info-container__contact-item__right-title'> 邮箱 </Text>
              <Text className='user-info-container__contact-item__right-text'> {userInfo.email} </Text>
            </View>
          </View>
          <View className='user-info-container__contact-item'>
            <AtIcon prefixClass='icon' value='cake' size='20' color='#BABABA'/>
            <View className='user-info-container__contact-item__right'>
              <Text className='user-info-container__contact-item__right-title'> 生日 </Text>
              <Text className='user-info-container__contact-item__right-text'> {userInfo.birthday} </Text>
            </View>
          </View>
          <View className='user-info-container__contact-item'>
            <AtIcon prefixClass='icon' value='phone' size='20' color='#BABABA'/>
            <View className='user-info-container__contact-item__right'>
              <Text className='user-info-container__contact-item__right-title'> 电话 </Text>
              <Text className='user-info-container__contact-item__right-text'> {userInfo.phone} </Text>
            </View>
          </View>
        </View>

        <View className='user-info-container__contact user-info-container__contact-second'>
          <Text className='user-info-container-title'> 其他 </Text>
          <View onClick={() => goAbout()} className='user-info-container__contact-item user-info-container__contact-item__active user-info-container__contact-item__border'>
            <AtIcon prefixClass='icon' value='info' size='20' color='#BABABA' />
            <View className='user-info-container__contact-item__right'>
              <Text className='user-info-container__contact-item__right-title'> 信息 </Text>
              <Text className='user-info-container__contact-item__right-text'> 关于 KoCost 的信息 </Text>
            </View>
          </View>
          <View onClick={() => openSetting()} className='user-info-container__contact-item user-info-container__contact-item__active user-info-container__contact-item__border'>
            <AtIcon prefixClass='icon' value='setting' size='20' color='#BABABA' />
            <View className='user-info-container__contact-item__right'>
              <Text className='user-info-container__contact-item__right-title'> 设置 </Text>
              <Text className='user-info-container__contact-item__right-text'> 管理授权 </Text>
            </View>
          </View>
          <View onClick={() => logOut()} className='user-info-container__contact-item user-info-container__contact-item__active'>
            <AtIcon prefixClass='icon' value='logout' size='20' color='#BABABA' />
            <View className='user-info-container__contact-item__right'>
              <Text className='user-info-container__contact-item__right-title'> 退出 </Text>
              <Text className='user-info-container__contact-item__right-text'> 登出账号 </Text>
            </View>
          </View>
        </View>
        <View className={'user-info-container__wrap'}>
          <AtButton
            type={'primary'}
            className={'user-info-container__wrap-contact'}
            openType={'contact'}
            size={'small'}>
            意见反馈
          </AtButton>
        </View>
      </View>
    )
  }
}

export default UserInfo
