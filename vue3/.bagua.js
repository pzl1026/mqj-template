const path = require('path');
const pages = require('./src/pages/pagesAsync');
console.log(pages, 'pahhh')
module.exports = {
  name: 'vue3',
  autoOpen: false,
  staticDir: '/static', //生产完成后拷贝到哪个目录
  serverDir: '../output',
  shared: [{ vue: { singleton: true } }],
  dev: {
    st1: {
      devServer: {
        proxy: {
          '/api': {
            target: 'http://st1-api.mingqijia.com/',
            changeOrigin: true,
          },
        },
      },
    },
    default: {
      port: '3004',
      nomocker: false,
      filename: 'remoteEntry.js',
      exposes: {
        ...pages,
      },
      remotes: {
        common: 'common@//localhost:3001/remoteEntry.js'
      },
      output: {
        publicPath: '//localhost:3004/',
      },
    },
  },
  prod: {
    st1: {
      remotes: {
        common: 'common@//localhost:8080/common/js/remoteEntry.js'
      },
      output: {
        publicPath: '//localhost:8080/',
      },
    },
    default: {
      filename: 'goods/js/remoteEntry.js',
      exposes: {
        ...pages,
      },
      output: {
        publicPath: '//localhost:3003/',
      },
    },
  },
};
