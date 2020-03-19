/**
 * @Description: 用户注册
 * @author yidierh
 * @email yidierh@gmail.com
 * @date 2020-02-26
 */
import * as config from '../../../../config.json'
import {get as getGlobalData} from 'utils/global'
import {AtInput, AtButton, AtMessage} from 'taro-ui'
import Taro, {Component} from '@tarojs/taro'
import {Text, View} from '@tarojs/components'

import { isNewUser, addUser } from "api/user";

import {formatDate} from "utils/filter";

import './index.scss'

export default class Register extends Component {

  config = {
    navigationBarTitleText: '注册'
  }

  constructor() {
    super(...arguments)
    this.state = {
      email: '',
      emailError: false,
      birthday: '',
      birthdayError: false,
      phone: '',
      phoneError: false,
      hasError: false,
      loading: false
    }
  }

  componentWillMount() {
    this.getDate()
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
  register = async () => {

    const {email, birthday, phone, hasError} = this.state

    if (!email || !birthday || !phone) {
      Taro.atMessage({
        'message': '请检查注册信息是否有误',
        'type': 'error',
      })
      return false
    }

    //注册
    if (!hasError) {
      try {
        this.setState({loading: true})

        const wxUserInfo = await getGlobalData('wxUserInfo')

        const {avatarUrl, nickName} = wxUserInfo

        const _isNew = await isNewUser()

        if (!_isNew) {
          Taro.atMessage({
            'message': '您已经注册过了哦',
            'type': 'error',
          })
          // 跳转首页（其实这里是有BUG才会进这里）
        } else {

          await addUser ({email, birthday, phone, avatar_url: avatarUrl, nick_name: nickName})

          Taro.atMessage({
            'message': '注册成功',
            'type': 'success',
          })
        }

        this.setState({loading: false})

        Taro.switchTab({ url: '/pages/home/index' })

      } catch (e) {
        Taro.atMessage({
          'message': `${e ? e : '网络链接错误，请稍后再试'}`,
          'type': 'error',
        })
        this.setState({loading: false})
      }
    }
  }

  validate = (value, {currentTarget}) => {

    let re = null

    const name = currentTarget.id

    if (name === 'email') {
      re = /^\w+@[a-z0-9]+\.[a-z]{2,4}$/
    } else if (name === 'phone') {
      re = /^1(3[0-9]|4[5,7]|5[0,1,2,3,5,6,7,8,9]|6[2,5,6,7]|7[0,1,7,8]|8[0-9]|9[1,8,9])\d{8}$/
    } else {
      re = /^\d{4}([\/\-]?)\d{1,2}\1\d{1,2}$/
    }

    this.setState({
      [`${currentTarget.id}Error`]: !re.test(value),
      hasError: !re.test(value)
    })
  }

  getDate() {
    this.setState({
      birthday: formatDate()
    })
  }

  handleChange(value, {currentTarget}) {
    this.setState({
      [currentTarget.id]: value
    })
    // 在小程序中，如果想改变 value 的值，需要 `return value` 从而改变输入框的当前值
    return value
  }

  render() {
    const {email, emailError, phone, phoneError, birthday, birthdayError, loading} = this.state
    return (
      <View className='register-container'>
        <AtMessage />
        <Text className='register-container-title'> {config.appName} </Text>
        <Text className='register-container-text'> 欢迎您， </Text>
        <Text className='register-container-sub'> 继续前进 </Text>
        {/*  表单 */}
        <View
          className='register-container-form'
        >
          <AtInput
            name='email'
            type='text'
            title='邮箱'
            maxLength='20'
            placeholder='请输入邮箱'
            className='register-container-form-input'
            placeholderClass='register-container-form-placeholder'
            error={emailError}
            value={email}
            onBlur={this.validate.bind(this)}
            onChange={this.handleChange.bind(this)}
          />
          <AtInput
            name='phone'
            type='phone'
            title='电话'
            placeholder='请输入电话'
            className='register-container-form-input'
            placeholderClass='register-container-form-placeholder'
            error={phoneError}
            value={phone}
            onBlur={this.validate.bind(this)}
            onChange={this.handleChange.bind(this)}
          />
          <AtInput
            name='birthday'
            type='text'
            title='生日'
            maxLength='10'
            placeholder='xxxx/xx/xx'
            className='register-container-form-input'
            placeholderClass='register-container-form-placeholder'
            error={birthdayError}
            value={birthday}
            onBlur={this.validate.bind(this)}
            onChange={this.handleChange.bind(this)}
          />

          <AtButton loading={loading} className='register-container-form-btn' type='primary' onClick={this.register}> 注册 </AtButton>
        </View>
      </View>
    )
  }
}
