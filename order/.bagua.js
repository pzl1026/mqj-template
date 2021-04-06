const path = require('path');
const pages = require('./src/pages/pagesAsync');

module.exports = {
  name: 'order',
  autoOpen: true,
  staticDir: '/static', //生产完成后拷贝到哪个目录
  serverDir: '../output',
  shared: [{ vue: { singleton: true } }],
  // library: { type: 'var', name: 'vue' },   //如果需要remotes，就应该将该属性屏蔽
  dev: {
    st1: {
      port: '3002',
      nomocker: false,
      filename: 'remoteEntry.js',
      exposes: {
        // './pages': path.resolve(__dirname, 'src/pages'),
        ...pages
      },
      remotes: {
        // app2: 'app2@http://localhost:3002/remoteEntry.js',
        common: 'common@//localhost:3001/remoteEntry.js'
      },
      devServer: {
        proxy: {
          '/api': {
            target: 'http://st1-api.mingqijia.com/',
            changeOrigin: true,
          },
        },
      },
      output: {
        publicPath: '//localhost:3002/',
      },
    },
    default: {
      port: '3002',
      nomocker: false,
      devServer: {
        proxy: {
          '/api': {
            target: 'http://st1-api.mingqijia.com/',
            changeOrigin: true,
          },
        },
      },
      output: {
        publicPath: '//localhost:3002/',
      },
    },
  },
  prod: {
    st1: {
      filename: 'order/js/remoteEntry.js',
      remotes: {
        common: 'common@//localhost:8080/common/js/remoteEntry.js'
      },
      exposes: {
        // './pages': path.resolve(__dirname, 'src/pages'),
        ...pages
      },
      output: {
        publicPath: '//localhost:8080/',
      },
    },
    default: {
      output: {
        publicPath: '//localhost:3003/',
      },
    },
  },
};
