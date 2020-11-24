const path = require('path');

module.exports = {
  name: 'vue',
  isTop: false,
  // shared: [{ goods: { singleton: true } }],
  // library: { type: 'var', name: 'vue' },   //如果需要remotes，就应该将该属性屏蔽
  dev: {
    st1: {
      port: '8000',
      nomocker: false,
      exposes: {
        './pages': path.resolve(__dirname, 'src/pages'),
      },
      remotes: {
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
        publicPath: '//localhost:8000/',
      },
    },
    default: {
      port: '8000',
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
        publicPath: '//localhost:8000/',
      },
    },
  },
  prod: {
    st1: {
      remotes: {
        common: 'common@//localhost:3001/remoteEntry.js'
      },
      exposes: {
        './pages': path.resolve(__dirname, 'src/pages'),
      },
      output: {
        publicPath: '//localhost:8000/goods/',
      },
    },
    default: {
      output: {
        publicPath: '//localhost:8000/',
      },
    },
  },
};
