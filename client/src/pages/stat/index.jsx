import Taro, {Component} from '@tarojs/taro'
import {View, Text} from '@tarojs/components'
import './index.scss'

export default class Stat extends Component {

    config = {
        navigationBarTitleText: '统计',
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
            <View className='stat-container'>
            </View>
        )
    }
}
