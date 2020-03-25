import Taro, {Component} from '@tarojs/taro'
import {View, Text} from '@tarojs/components'
import './index.scss'
import {AtButton, AtMessage} from "taro-ui";
import { getAppData } from "@/api/app";

export default class log extends Component {

    config = {
        navigationBarTitleText: '关于',
    }

    constructor() {
      super(...arguments);
      this.state = {
        github: 'https://github.com/eddieyd/mini-bookkeeping'
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

    fetchData = async () => {
      try {
        const res = await getAppData()
        this.setState({
          github: res.github
        })
      } catch (e) {
        throw e
      }
    }

    // methods
    copy = () => {
      Taro.setClipboardData({
        data: 'https://github.com/eddieyd/mini-bookkeeping',
        success: function (res) {
          Taro.atMessage({
            'message': 'github 地址复制成功',
            'type': 'success',
          })
        }
      })
    }

    render() {
        return (
            <View className='about-container'>
              <AtMessage />
              <View className='about-container__text'>
              <Text>项目已开源，喜欢的朋友可以点击 “获取网址” 前往下载，</Text>
              <Text>有问题欢迎向我提问，</Text>
              <Text>最后，</Text>
              <Text>麻烦给个 Star 谢谢 ！</Text>
              </View>
              <View className='about-container__wrap'>
                <AtButton
                  type={'secondary'}
                  className={'user-info-container__wrap-copy'}
                  size={'small'}
                  onClick={() => this.copy()}>
                  获取网址
                </AtButton>
              </View>
            </View>
        )
    }
}
