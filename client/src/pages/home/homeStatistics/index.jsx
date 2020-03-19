/**
 * @Description: 统计的组件
 * @author yidierh
 * @email yidierh@gmail.com
 * @date 2020-02-27
 */
import {formatNumber} from 'utils/filter'
import Taro, {Component} from '@tarojs/taro'

import {Text, View} from '@tarojs/components'
import './index.scss'

import Chart from 'components/chart'

export default class HomeStatistics extends Component {

  config = {
    component: true
  }

  static defaultProps = {
    inSum: 0,
    outSum: 0,
    xData: [],
    sumData: [],
    incomeData: [],
    payData: [],
    lastSum: 0
  }

  constructor(props) {
    super(props)
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

  setOptions = ({xData, incomeData, payData, sumData}) => {
    return {
      grid: {
        top: '5%'
      },
      tooltip: {
        trigger: 'axis',
        position: function (point, params, dom, rect, size) {
          //其中point为当前鼠标的位置，size中有两个属性：viewSize和contentSize，分别为外层div和tooltip提示框的大小
          let x = point[0];//
          let y = point[1];
          let boxWidth = size.contentSize[0];
          let boxHeight = size.contentSize[1];
          let posX = 0;//x坐标位置
          let posY = 0;//y坐标位置

          if (x < boxWidth) {//左边放不开
            posX = 5;
          } else {//左边放的下
            posX = x - boxWidth;
          }

          if (y < boxHeight) {//上边放不开
            posY = 5;
          } else {//上边放得下
            posY = y - boxHeight;
          }

          return [posX, posY];

        }
      },
      textStyle: {
        color: '#fff'
      },
      xAxis: {
        type: 'category',
        data: xData,
        axisLabel: {
          rotate: 40
        },
        axisLine: {
          lineStyle: {
            color: '#fff'
          }
        }
      },
      yAxis: {
        type: 'value',
        axisLine: {
          lineStyle: {
            color: '#fff'
          }
        },
        axisLabel: {
          interval: 0,
          rotate: 40,
          margin: 10,
          formatter: function (value, index) {
            if (value >= 1000 && value < 10000) {
              value = value / 1000 + 'K'
            } else if (value >= 10000 && value < 10000000) {
              value = value / 10000 + "W";
            } else if (value >= 10000000) {
              value = value / 10000000 + "KW";
            }
            return value;
          }
        }
      },
      series: [
        {
          data: sumData,
          type: 'line',
          name: '总消费',
          itemStyle: {
            normal: {
              color: '#33CCFF',
              lineStyle: {
                color: '#33CCFF'
              }
            }
          }
        }, {
          data: payData,
          type: 'line',
          name: '总支出',
          itemStyle: {
            normal: {
              color: 'rgb(255, 81, 82)',
              lineStyle: {
                color: 'rgb(255, 81, 82)'
              }
            }
          }
        }, {
          data: incomeData,
          type: 'line',
          name: '总收入',
          itemStyle: {
            normal: {
              color: '#FF6834',
              lineStyle: {
                color: '#FF6834'
              }
            }
          }
        }
      ]
    }
  }

  render() {
    const {inSum, outSum, lastSum, xData, incomeData, payData, sumData} = this.props

    const monthSum = outSum * -1 + inSum
    const compareSum = lastSum - monthSum

    return (
      <View className='home-statistics-container'>
        <View className='home-statistics-container__box'>
          <View className='home-statistics-container__box-top'>
            <Text className='home-statistics-container__box__text__title'>
              本月总消费
            </Text>
            <Text className='home-statistics-container__box__text__money'>
              {formatNumber(monthSum)}
            </Text>
            <Text className='home-statistics-container__box__text__sub'>
              与上月相比 { `${compareSum > 0 ? '+' : '-'} ${ formatNumber(compareSum) }` }
            </Text>
          </View>
          <View className='home-statistics-container__box-center'>
            <View className='home-statistics-container__box-center__item'>
              <Text className='home-statistics-container__box__text__title'>
                本月支出
              </Text>
              <Text className='home-statistics-container__box__text__money-detail'>
                {formatNumber(outSum)}
              </Text>
            </View>
            <View className='home-statistics-container__box-center__item'>
              <Text className='home-statistics-container__box__text__title'>
                本月收入
              </Text>
              <Text className='home-statistics-container__box__text__money-detail'>
                {formatNumber(inSum)}
              </Text>
            </View>
          </View>
          <View className='home-statistics-container__box-chart'>
            { xData.length ? <Chart option={this.setOptions({xData, incomeData, payData, sumData})}/> : '' }
          </View>
        </View>
      </View>
    )
  }
}

