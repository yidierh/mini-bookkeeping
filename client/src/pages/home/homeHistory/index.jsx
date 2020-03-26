/**
 * @Description: 历史记录，默认一个月
 * @author yidierh
 * @email yidierh@gmail.com
 * @date 2020-02-27
 */
import { getRecordHistory } from 'api/record'
import { getBank } from 'api/bank'
import { get as getGlobalData, set as setGlobalData } from 'utils/global'
import Taro, {Component} from '@tarojs/taro'
import {ScrollView, View, Text} from '@tarojs/components'

import {AtIcon} from 'taro-ui'

import {formatDate, formatNumber} from "utils/filter"

import './index.scss'

export default class HomeHistory extends Component {

  constructor() {
    super(...arguments)
    this.state = {
      history_list: [],
      bank_data: []
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
      Promise.all([getRecordHistory(), getBank()]).then(res => {
        this.setState({
          history_list: [ ...res[0] ],
          bank_data: { ...res[1] }
        })
      })
    }
  }

  onScroll = () => {

  }

  addRecord = () => {
    Taro.navigateTo({ url: '/pages/record/index' })
  }

  goDetail = (id) => {
    Taro.navigateTo({ url: `/pages/details/index?id=${id}`})
  }

  render() {
    const { history_list, bank_data } = this.state
    return (
      <View className='home-history-container'>
        <View onClick={this.addRecord} className='home-history-container-add'>
          <AtIcon value='add' size='20' color='#FFF' />
        </View>
        { history_list.length ? <ScrollView
          scrollY
          scrollWithAnimation
          className='home-history-container-scroll'
          onScroll={this.onScroll}
        >
          <Text className='home-history-container-scroll__title'> 记账记录 </Text>
          { history_list.map((item, index, arr) =>
            <View
              onClick={() => this.goDetail(item._id)}
              className={`home-history-container-scroll__item ${ index + 1 !== arr.length ? 'home-history-container-scroll__item__last' : '' }`} key={`home-history-container-scroll__item-${index}`}>
              <View className='home-history-container-scroll__item-left'>
                <AtIcon prefixClass='icon' value={bank_data[item.bank_type].icon} size='20' color='#3C4EEA' />
              </View>
              <View className='home-history-container-scroll__item-right'>
                <Text className='home-history-container-scroll__item-right-title'> { bank_data[item.bank_type].title } </Text>
                <Text className={`home-history-container-scroll__item-right-money ${item.type ? 'come' : 'out'}`}> {item.type ? '+' : '-'} { formatNumber(item.money) }</Text>
                <Text className='home-history-container-scroll__item-right-time'> { formatDate(item.date) } </Text>
              </View>
            </View>
          ) }
        </ScrollView> : '' }
      </View>
    )
  }
}
