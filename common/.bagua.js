const path = require('path');

module.exports = {
  name: 'common',
  isTop: true,
  shared: {
    react: {
      singleton: true, // only a single version of the shared module is allowed
    },
    'react-dom': { singleton: true },
    vue: { singleton: true },
  },
  // library: { type: "var", name: "common" },
  dev: {
    st1: {
      port: '3001',
      nomocker: false,
      remotes: {
        goods: 'goods@//localhost:3003/remoteEntry.js',
        order: 'order@//localhost:3002/remoteEntry.js',
        // app2: 'app2@http://localhost:3002/remoteEntry.js',
      },
      exposes: {
        './util': path.resolve(__dirname, 'src/util'),
        './components': path.resolve(__dirname, 'src/components'),
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
        publicPath: '//localhost:3001/',
      },
    },
    default: {
      port: '3001',
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
        publicPath: '//localhost:3001/',
      },
    },
  },
  prod: {
    st1: {
      remotes: {
        goods: 'goods@//localhost:3001/goods/remoteEntry.js',
        order: 'order@//localhost:3001/order/remoteEntry.js',
        // app2: 'app2@http://localhost:3002/remoteEntry.js',
      },
      exposes: {
        './util': path.resolve(__dirname, 'src/util'),
        './components': path.resolve(__dirname, 'src/components'),
      },
      output: {
        publicPath: '//localhost:3001/',
      },
    },
    default: {
      output: {
        publicPath: '//localhost:3001/',
      },
    },
  },
};
