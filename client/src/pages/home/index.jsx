import { get as getGlobalData, set as setGlobalData } from 'utils/global'
import { getMonthSum, getMonth, getLastSum } from 'api/record'
import Taro, { Component } from '@tarojs/taro'
import {View, Text, Button} from '@tarojs/components'

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


  componentWillMount () { }


  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () {
    this.fetchData()
  }

  componentDidHide () { }

  // methods
  fetchData = async () => {
    const is_first = await getGlobalData('isFirst')
    const is_update = await getGlobalData('isUpdate')

    if (is_update || is_first) {

      if (is_first) await setGlobalData('isFirst', false)
      else if (is_update) await setGlobalData('isUpdate', false)
      Promise.all([getMonthSum(0), getMonthSum(1), getMonth(), this.getLastSumFun()]).then(res => {
        const { x, sumData, payData, incomeData } = this.forMatMonth(res[2])
        this.setState({
          outSum: res[0],
          inSum: res[1],
          xData: [...x],
          sumData: [...sumData],
          payData: [...payData],
          incomeData: [...incomeData]
        })
      })
    }
  }

  getLastSumFun = async () => {
    const is_first = await getGlobalData('isFirst')
    if (is_first) {
      getLastSum().then(res => {
        this.setState({ lastSum: res })
      })
    }
  }

  forMatMonth= (arr) => {
    let x = []
    let sumData = []
    let incomeData = []
    let payData = []
    arr.forEach(item => {
      x.push(item.month)
      sumData.push(item.sum)
      incomeData.push(item.income)
      payData.push(item.pay)
    })
    return { x: x, sumData, incomeData, payData }
  }

  render () {
    const { inSum, outSum, xData,  incomeData, payData, sumData, lastSum } = this.state
    return (
      <View className='home-container'>
        <HomeTop />
        <HomeStatistics
          inSum={inSum}
          outSum={outSum}
          xData={xData}
          incomeData={incomeData}
          payData={payData}
          sumData={sumData}
          lastSum={lastSum}/>
        <HomeHistory />
      </View>
    )
  }
}
