var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"testing"',
  isUglyfy: false, //是否压缩
  showVConsole: true, //是否显示v-console
  baseApi: '',
  cdnURL: 'http://cdn.holyhilab.com/'
})