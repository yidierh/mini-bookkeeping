import Taro, {Component} from '@tarojs/taro'
import {View, Text} from '@tarojs/components'
import './index.scss'

export default class log extends Component {

    config = {
        navigationBarTitleText: '关于',
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

    render() {
        return (
            <View className='about-container'>
              <Text>轻松记下每笔银行账款~</Text>
              <Text>项目已开源，喜欢的朋友可以前往以下网址下载</Text>
              <Text>不求别的，只求一个 Star</Text>
              <Text>github: https://github.com/eddieyd/mini-bookkeeping</Text>
            </View>
        )
    }
}
