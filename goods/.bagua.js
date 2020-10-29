const path = require('path');

module.exports = {
  name: 'goods',
  isTop: false,
  // shared: [{ vue: { singleton: true } }],
  // library: { type: 'var', name: 'vue' },   //如果需要remotes，就应该将该属性屏蔽
  dev: {
    st1: {
      port: '3003',
      nomocker: false,
      exposes: {
        './pages': path.resolve(__dirname, 'src/pages'),
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
        publicPath: '//localhost:3003/',
      },
    },
    default: {
      port: '3003',
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
        publicPath: '//localhost:3003/',
      },
    },
  },
  prod: {
    st1: {
      remotes: {
        // app2: 'app2@http://localhost:3002/remoteEntry.js',
        common: 'common@//localhost:3001/remoteEntry.js'
      },
      exposes: {
        './pages': path.resolve(__dirname, 'src/pages'),
      },
      output: {
        publicPath: '//localhost:3001/goods/',
      },
    },
    default: {
      output: {
        publicPath: '//localhost:3003/',
      },
    },
  },
};
