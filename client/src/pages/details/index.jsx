/**
 * @Description: 当笔消费详情
 * @author yidierh
 * @email yidierh@gmail.com
 * @date 2020-02-29
 */
import { formatDate, formatNumber } from 'utils/filter'
import { getRecord, deleteRecord } from 'api/record'
import { getBank } from 'api/bank'
import Taro, {Component} from '@tarojs/taro'
import {AtIcon, AtModal, AtModalContent, AtModalAction, AtMessage} from 'taro-ui'
import { set as setGlobalData } from 'utils/global'

import {View, Text, Button} from '@tarojs/components'

import './index.scss'

export default class details extends Component {

    config = {
        navigationBarTitleText: '详情'
    }

    constructor() {
      super(...arguments)
      this.state = {
        detail_data: {},
        bank_data: {},
        show: false,
        loading: false
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

    fetchData = () => {
      Promise.all([getRecord({_id: this.$router.params.id}), getBank()]).then(res => {
        this.setState({detail_data: { ...res[0] }, bank_data: { ...res[1] }})
      })
    }

    goEdit = (id) => {
      Taro.navigateTo({ url: `/pages/record/index?id=${id}` })
    }

    delete = async (id) => {
      this.setState({loading: true})
      try {
        await deleteRecord({ _id: id })

        await setGlobalData('isUpdate', true)

        Taro.atMessage({
          'message': '删除成功',
          'type': 'success',
        })

        this.setState({loading: false, show: false}, () => {
          Taro.switchTab({ url: '/pages/home/index' })
        })

      } catch (e) {
        this.setState({loading: false, show: false})
        Taro.atMessage({
          'message': e ? e : '网路错误，请稍后再试',
          'type': 'error',
        })
      }
    }

    render() {
      const { detail_data, bank_data, show, loading } = this.state
        return (
            <View className='details-container'>
              <AtMessage/>
              <View onClick={() => this.setState({ show: true })} className='details-container__btn-delete'>
                <AtIcon value='trash' size='20' color='#FFF' />
              </View>
              <View onClick={() => this.goEdit(detail_data._id)} className='details-container__btn-edit'>
                <AtIcon value='edit' size='20' color='#FFF' />
              </View>
              <View className='details-container__top'>
                <View className='details-container__top-left'>
                  <AtIcon prefixClass='icon' value={detail_data&& detail_data.bank_type ? bank_data[detail_data.bank_type].icon : ''} size='30' color='#3C4EEA' />
                </View>
                <View className='details-container__top-right'>
                  <Text className='details-container__top-right__title'> {detail_data&& detail_data.bank_type ? bank_data[detail_data.bank_type].title : ''} </Text>
                  <Text className='details-container__top-right__text'> CHINESE BANK </Text>
                </View>
              </View>
              <View className='details-container__content'>
                <View className='details-container__content-item'>
                  <AtIcon prefixClass='icon' value='calendar' size='20' color='#BABABA' />
                  <View className='details-container__content-item__right'>
                    <Text className='details-container__content-item__right-title'> 日期 </Text>
                    <Text className='details-container__content-item__right-text'> { formatDate(detail_data.date) } </Text>
                  </View>
                </View>
                <View className='details-container__content-item'>
                  <AtIcon prefixClass='icon' value='money' size='20' color='#BABABA' />
                  <View className='details-container__content-item__right'>
                    <Text className='details-container__content-item__right-title'> { detail_data.type ? '收入' : '支出' }金额 </Text>
                    <Text className='details-container__content-item__right-text'>{ detail_data.type ? '+' : '-' } { formatNumber(detail_data.money) }</Text>
                  </View>
                </View>
                <View className='details-container__content-item'>
                  <AtIcon prefixClass='icon' value='bank' size='20' color='#BABABA' />
                  <View className='details-container__content-item__right'>
                    <Text className='details-container__content-item__right-title'> 消费银行 </Text>
                    <Text className='details-container__content-item__right-text'> { bank_data[detail_data.bank_type].title } </Text>
                  </View>
                </View>
                <View className='details-container__content-item'>
                  <AtIcon prefixClass='icon' value='description' size='20' color='#BABABA' />
                  <View className='details-container__content-item__right'>
                    <Text className='details-container__content-item__right-title'> 描述信息 </Text>
                    <Text className='details-container__content-item__right-text'> { detail_data.description } </Text>
                  </View>
                </View>
              </View>
              <AtModal isOpened={show}>
                <AtModalContent>
                  删除后将不可恢复，您确定吗？
                </AtModalContent>
                <AtModalAction> <Button onClick={() => this.setState({show:false})}>取消</Button> <Button loading={loading} onClick={() => this.delete(detail_data._id)} >确定</Button> </AtModalAction>
              </AtModal>
            </View>
        )
    }
}
