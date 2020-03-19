/**
 * @Description: 添加记录页面
 * @author yidierh
 * @email yidierh@gmail.com
 * @date 2020-02-28
 */
import Taro, {Component} from '@tarojs/taro'
import {View, Text, ScrollView} from '@tarojs/components'
import {AtIcon, AtInput, AtTextarea, AtButton, AtSegmentedControl, AtMessage} from 'taro-ui'
import {addRecord, updateRecord, getRecord} from 'api/record'
import {getBank} from 'api/bank'

import {set as setGlobalData} from 'utils/global'

import './index.scss'

export default class Record extends Component {

  config = {
    navigationBarTitleText: '记账'
  }

  constructor() {
    super(...arguments)
    this.state = {
      bank_data: {},
      bank_type: '0',
      type: 0,
      money: '',
      description: '',
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

  // methods

  fetchData = () => {
    Promise.all([getBank(), this.getDetail()]).then(res => {
      this.setState(({
        bank_data: {...res[0]}
      }))
      this.isEdit() ? this.setEdit(res[1]) : null
    })
  }

  getDetail = () => {
    if (this.isEdit()) {
      return getRecord({_id: this.$router.params.id})
    } else {
      return null
    }
  }

  setEdit = (params) => {
    const {bank_type, type, money, description} = params
    this.setState({
      bank_type, type, money, description
    })
  }

  isEdit = () => {
    return this.$router.params && this.$router.params.id
  }

  updateCurrent = (value) => {
    this.setState({type: value})
  }

  selectType = (value) => {
    this.setState({bank_type: value})
  }

  handleChange = (value, {currentTarget}) => { // currentTarget
    this.setState({
      [currentTarget.id]: value
    })
  }

  handleChangeDec = ({detail}) => {
    this.setState({
      description: detail.value
    })
  }

  saveRecord = async () => {
    this.setState({loading: true})
    try {
      const {type, bank_type, description, money} = this.state

      let _money = parseFloat(money)

      let is_edit = this.isEdit()

      if (!is_edit) {
        await addRecord({type, bank_type, description, money: _money})
      } else {
        await updateRecord({_id: this.$router.params.id, type, bank_type, description, money: _money})
      }

      await setGlobalData('isUpdate', true)

      Taro.atMessage({
        'message': '保存成功',
        'type': 'success',
      })

      this.setState({loading: false}, () => {
        Taro.switchTab({url: '/pages/home/index'})
      })

    } catch (e) {

      this.setState({loading: false})

      Taro.atMessage({
        'message': e ? e : '网路错误，请稍后再试',
        'type': 'error',
      })
    }
  }


  render() {
    const {bank_data, bank_type, type, money, description, loading} = this.state
    return (
      <View className='record-container'>
        <View className='record-container__top'>
          <AtSegmentedControl
            onClick={this.updateCurrent.bind(this)}
            selectedColor='#3C4EEA'
            fontSize='28'
            current={type}
            values={['支出', '收入']}
          />
        </View>
        <View className='record-container__type'>
          <Text className='record-container__type-title'> 消费银行 </Text>
          <ScrollView
            scrollX
            scrollWithAnimation
            enableFlex
            className='record-container__type-scroll'
          >
            {Object.keys(bank_data).map(key =>
              <View key={`type_scroll_item-${key}`}
                onClick={() => this.selectType(key)}
                className={`record-container__type-scroll-item ${bank_type === key ? 'record-container__type-scroll-item__active' : ''}`}
              >
                <View
                  className={`record-container__type-scroll-item__icon ${bank_type === key ? 'record-container__type-scroll-item__icon__active' : ''}`}
                >
                  <AtIcon prefixClass='icon' value={bank_data[key].icon} size='20' />
                </View>
                <View
                  className={`record-container__type-scroll-item__title ${bank_type === key ? 'record-container__type-scroll-item__title__active' : ''}`}
                >{bank_data[key].title}</View>
              </View>
            )}
          </ScrollView>
        </View>

        <View className='record-container__form'>
          <Text className='record-container__form-title'> 消费金额 </Text>
          <AtInput
            name='money'
            type='digit'
            maxLength='20'
            placeholder='¥ 请输入金额'
            value={money}
            onChange={this.handleChange.bind(this)}
          />
          <Text className='record-container__form-title'> 描述信息 </Text>
          <AtTextarea
            name='description'
            maxLength='200'
            placeholder='请填写描述...'
            value={description}
            onChange={this.handleChangeDec.bind(this)}
          />

          <View className='record-container__form-btn'>
            <AtButton className='orange-btn' type='primary' onClick={this.saveRecord}
              loading={loading}
            > {this.isEdit() ? '修改' : '添加'} </AtButton>
          </View>
        </View>
        <AtMessage />
      </View>
    )
  }
}
