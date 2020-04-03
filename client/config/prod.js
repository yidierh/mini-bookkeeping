const config = require('../../mini.config');
module.exports = {
  env: {
    NODE_ENV: '"production"'
  },
  defineConstants: {
    CLOUD_ID: JSON.stringify(config.cloud_prod),
    APP_NAME: JSON.stringify(config.app_name),
    TEMPL_IDS: JSON.stringify(config.tmpl_ids)
  },
  mini: {},
  h5: {
    /**
     * 如果h5端编译后体积过大，可以使用webpack-bundle-analyzer插件对打包体积进行分析。
     * 参考代码如下：
     * webpackChain (chain) {
     *   chain.plugin('analyzer')
     *     .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin, [])
     * }
     */
  }
}
