/**
 * @Description: 个人中心骨架屏
 * @author yidierh
 * @email yidierh@gmail.com
 * @date 2020-02-25
 */
import Taro, {Component} from '@tarojs/taro'
import {View} from '@tarojs/components'
import './index.scss'

export default class UserLoading extends Component {

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
        return (
            <View className='user-loading-container'>
              <View className='user-loading-container-avatar__wrap'>
                <View className='user-loading-container-avatar__wrap-content' />
              </View>
              <View className='user-loading-container-input__top' />
              <View className='user-loading-container-input__top' />

              <View className='user-loading-container-input__bottom first' />
              <View className='user-loading-container-input__bottom' />
              <View className='user-loading-container-input__bottom' />
            </View>
        )
    }
}
