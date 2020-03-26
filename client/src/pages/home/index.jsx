import {get as getGlobalData, set as setGlobalData} from 'utils/global'
import {getMonthSum, getLastSum} from 'api/record'
import Taro, {Component} from '@tarojs/taro'
import {View} from '@tarojs/components'

import './index.scss'

import HomeTop from './homeTop'
import HomeStatistics from './HomeStatistics'
import HomeHistory from './HomeHistory'

export default class Home extends Component {

  config = {
    navigationBarTitleText: '首页',
    navigationBarBackgroundColor: '#FAFAFA',
    backgroundColor: '#FAFAFA'
  }

  constructor() {
    super(...arguments)
    this.state = {
      outSum: 0,
      inSum: 0,
      xData: [],
      incomeData: [],
      sumData: [],
      payData: [],
      lastSum: 0
    }

  }

  componentWillMount() {
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  componentDidShow() {
    this.fetchData()
  }

  componentDidHide() {
  }

  // methods
  fetchData = async () => {
    const is_first = await getGlobalData('isFirst')
    const is_update = await getGlobalData('isUpdate')

    if (is_update || is_first) {

      if (is_first) await setGlobalData('isFirst', false)
      else if (is_update) await setGlobalData('isUpdate', false)
      Promise.all([getMonthSum(0), getMonthSum(1), this.getLastSumFun(is_first)]).then(res => {
        this.setState({
          outSum: res[0],
          inSum: res[1]
        })
      })
    }
  }

  getLastSumFun = async (is_first) => {
    if (is_first) {
      getLastSum().then(res => {
        this.setState({lastSum: res})
      })
    }
  }

  render() {
    const {inSum, outSum, lastSum} = this.state
    return (
      <View className='home-container'>
        <HomeTop/>
        <HomeStatistics
          inSum={inSum}
          outSum={outSum}
          lastSum={lastSum}
        />
        <HomeHistory/>
      </View>
    )
  }
}
