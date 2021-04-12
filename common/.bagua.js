const path = require('path');

module.exports = {
  name: 'common',
  autoOpen: true,
  staticDir: '/static',
  viewDir: '/view',
  serverDir: '../output',
  shared: {
    vue: { singleton: true },
    'vue-router': { singleton: true },
  },
  // library: { type: "var", name: "common" },
  dev: {
    st1: {
      devServer: {
        proxy: {
          '/api': {
            target: 'http://st1-api.mingqijia.com/',
            changeOrigin: true,
          },
        },
      }
    },
    default: {
      port: '3001',
      nomocker: false,
      filename: 'remoteEntry.js',
      remotes: {
        goods: 'goods@//localhost:3003/remoteEntry.js',
        order: 'order@//localhost:3002/remoteEntry.js',
      },
      exposes: {
        './util': path.resolve(__dirname, 'src/util'),
        // './components': path.resolve(__dirname, 'src/components'),
      },
      output: {
        publicPath: '//localhost:3001/',
      },
    },
  },
  prod: {
    st1: {
      remotes: {
        goods: 'goods@//localhost:8080/goods/js/remoteEntry.js',
        order: 'order@//localhost:8080/order/js/remoteEntry.js',
      },
      output: {
        publicPath: '//localhost:8080/',
      },
    },
    default: {
      filename: 'common/js/remoteEntry.js',
      exposes: {
        './util': path.resolve(__dirname, 'src/util'),
        './components': path.resolve(__dirname, 'src/components'),
      },
      output: {
        publicPath: '//localhost:3001/',
      },
    },
  },
};
