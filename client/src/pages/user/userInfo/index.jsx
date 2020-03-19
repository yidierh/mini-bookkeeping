/**
 * @Description: 用户信息展示
 * @author yidierh
 * @email yidierh@gmail.com
 * @date 2020-02-25
 */
import Taro, {Component} from '@tarojs/taro'
import {View, Text} from '@tarojs/components'
import {AtAvatar, AtIcon} from 'taro-ui'
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
    const {userInfo} = this.props
    return (
      <View className='user-info-container'>
        <View className='user-info-container__top'>
          <View className='user-info-container__top-avatar'>
            <AtAvatar size='large' circle image={userInfo.avatar_url} />
          </View>
          <Text className='user-info-container__top-name'> {userInfo.nick_name} </Text>
        </View>
        <View className='user-info-container__contact user-info-container__contact-first'>
          <Text className='user-info-container-title'>信息</Text>
          <View className='user-info-container__contact-item'>
            <AtIcon prefixClass='icon' value='mail' size='15' color='#BABABA' />
            <View className='user-info-container__contact-item__right'>
              <Text className='user-info-container__contact-item__right-title'> 邮箱 </Text>
              <Text className='user-info-container__contact-item__right-text'> {userInfo.email} </Text>
            </View>
          </View>
          <View className='user-info-container__contact-item'>
            <AtIcon prefixClass='icon' value='cake' size='20' color='#BABABA' />
            <View className='user-info-container__contact-item__right'>
              <Text className='user-info-container__contact-item__right-title'> 生日 </Text>
              <Text className='user-info-container__contact-item__right-text'> {userInfo.birthday} </Text>
            </View>
          </View>
          <View className='user-info-container__contact-item'>
            <AtIcon prefixClass='icon' value='phone' size='20' color='#BABABA' />
            <View className='user-info-container__contact-item__right'>
              <Text className='user-info-container__contact-item__right-title'> 电话 </Text>
              <Text className='user-info-container__contact-item__right-text'> {userInfo.phone} </Text>
            </View>
          </View>
        </View>

        {/*<View className='user-info-container__contact user-info-container__contact-second'>*/}
        {/*  <Text className='user-info-container-title'> Koneksi </Text>*/}
        {/*  <View className='user-info-container__contact-item'>*/}
        {/*    <AtIcon prefixClass='icon' value='family' size='20' color='#BABABA' />*/}
        {/*    <View className='user-info-container__contact-item__right'>*/}
        {/*      <Text className='user-info-container__contact-item__right-title'> Invite Wali </Text>*/}
        {/*      <Text className='user-info-container__contact-item__right-text'> Mengundang orang tua atau kerabat agar*/}
        {/*        bisa*/}
        {/*        Memantaumu </Text>*/}
        {/*    </View>*/}
        {/*  </View>*/}
        {/*</View>*/}

        {/*<View className='user-info-container__contact user-info-container__contact-third'>*/}
        {/*  <Text className='user-info-container-title'> Lainnya </Text>*/}
        {/*  <View className='user-info-container__contact-item user-info-container__contact-item__border'>*/}
        {/*    <AtIcon prefixClass='icon' value='setting' size='20' color='#BABABA' />*/}
        {/*    <View className='user-info-container__contact-item__right'>*/}
        {/*      <Text className='user-info-container__contact-item__right-title'> Pengaturan </Text>*/}
        {/*      <Text className='user-info-container__contact-item__right-text'> Untuk merubah detail </Text>*/}
        {/*    </View>*/}
        {/*  </View>*/}
        {/*  <View className='user-info-container__contact-item user-info-container__contact-item__border'>*/}
        {/*    <AtIcon prefixClass='icon' value='info' size='20' color='#BABABA' />*/}
        {/*    <View className='user-info-container__contact-item__right'>*/}
        {/*      <Text className='user-info-container__contact-item__right-title'> Tentang kami </Text>*/}
        {/*      <Text className='user-info-container__contact-item__right-text'> Info tentang KoCost </Text>*/}
        {/*    </View>*/}
        {/*  </View>*/}
        {/*  <View className='user-info-container__contact-item'>*/}
        {/*    <AtIcon prefixClass='icon' value='logout' size='20' color='#BABABA' />*/}
        {/*    <View className='user-info-container__contact-item__right'>*/}
        {/*      <Text className='user-info-container__contact-item__right-title'> Log Out </Text>*/}
        {/*      <Text className='user-info-container__contact-item__right-text'> Keluar akun </Text>*/}
        {/*    </View>*/}
        {/*  </View>*/}
        {/*</View>*/}
      </View>
    )
  }
}

export default UserInfo
