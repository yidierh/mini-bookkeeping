import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import PropTypes from 'prop-types'
import _isEqual from 'lodash/isEqual.js'
import Nerv from 'nervjs'
import * as echarts from './ec-canvas/echarts'

let Taro_ = Taro

const commonFunc = (_this, chart) => {
  const { option, loading, loadingConf } = _this.props
  _this.beforeSetOption()

  _this.chartInstance = chart

  if (loading) {
    _this.chartInstance.showLoading('default', loadingConf)
  } else {
    _this.chartInstance.setOption(option)
  }
}

const initChart = (() => {
      return (_this) => {
        _this.chartRef.init((canvas, width, height) => {
          const chart = echarts.init(canvas, null, {
            width: width,
            height: height
          })
          canvas.setChart(chart)
          commonFunc(_this, chart)
          return chart
        })
      }
})()

export default class Chart extends Taro_.Component {

  config = {
    component: true,
    usingComponents: {
      'ec-canvas': './ec-canvas/ec-canvas'
    }
  }

  componentDidMount() {
    initChart(this)
  }

  componentWillReceiveProps(nextProps) {
    const { option: newOption } = nextProps
    if (!_isEqual(nextProps, this.props)) {
      this.refreshChart(newOption)
    }
  }

  shouldComponentUpdate(nextProps) {
    return !_isEqual(this.props, nextProps)
  }

  refreshChart = (newOption) => {
    const { option, loading, loadingConf } = this.props
    if (this.chartInstance) {
      if (loading) {
        this.chartInstance.showLoading('default', loadingConf)
      } else {
        this.chartInstance.hideLoading()
        this.chartInstance.setOption(newOption || option, true)
      }
    }
  }

  beforeSetOption = () => {
    const { onBeforeSetOption } = this.props

    onBeforeSetOption && onBeforeSetOption(echarts)
  }

  setChartRef = node => this.chartRef = node

  getImagePath = () => {
    const { chartRef } = this
    if (process.env.TARO_ENV !== 'weapp') throw '该方法只在微信小程序上支持'
    if (!chartRef || !chartRef.canvasToTempFilePath) {
      throw 'getImagePath error'
    }
    return new Promise((resolve, reject) => {
      chartRef.canvasToTempFilePath({
        success: ({ tempFilePath }) => resolve(tempFilePath),
        fail: () => reject('getImagePath fail')
      })
    })
  }

  render() {
    const { chartId, width, height, customStyle } = this.props

    let chartContainerStyle = `${customStyle}width:${width};height:${height};`

    return (
      <View style={chartContainerStyle}>
        <ec-canvas ref={this.setChartRef} ec={{ lazyLoad: false }} />
      </View>
    )
  }
}

Chart.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  customStyle: PropTypes.string,
  loading: PropTypes.bool,
  loadingConf: PropTypes.object,
  option: PropTypes.object.isRequired,
  onBeforeSetOption: PropTypes.func
}

Chart.defaultProps = {
  width: '100%',
  height: '200px',
  customStyle: '',
  loading: null,
  loadingConf: null,
  onBeforeSetOption: null
}
