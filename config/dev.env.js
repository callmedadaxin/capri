var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  isUglyfy: false, //是否压缩
  showVConsole: false, //是否显示v-console
  baseApi: '/mock/',
  cdnURL: 'http://cdn.holyhilab.com/'
})