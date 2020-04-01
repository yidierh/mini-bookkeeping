const config = require('../../mini.config');
module.exports = {
  env: {
    NODE_ENV: '"development"'
  },
  defineConstants: {
    CLOUD_ID: JSON.stringify(config.cloud_dev)
  },
  mini: {},
  h5: {}
}
