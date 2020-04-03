const config = require('../../mini.config');
module.exports = {
  env: {
    NODE_ENV: '"development"'
  },
  defineConstants: {
    CLOUD_ID: JSON.stringify(config.cloud_dev),
    APP_NAME: JSON.stringify(config.app_name),
    TEMPL_IDS: JSON.stringify(config.tmpl_ids)
  },
  mini: {},
  h5: {}
}
