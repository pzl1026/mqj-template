const path = require('path');

module.exports = {
  name: 'app3',
  isTop: false,
  shared: [{ vue: { singleton: true } }],
  // library: { type: 'var', name: 'vue' },   //如果需要remotes，就应该将该属性屏蔽
  dev: {
    st1: {
      port: '3003',
      nomocker: false,
      exposes: {
        './Widget': path.resolve(__dirname, 'src/index'),
        './app': path.resolve(__dirname, 'src/App.vue'),
        './test': path.resolve(__dirname, 'src/test'),
      },
      remotes: {
        // app2: 'app2@http://localhost:3002/remoteEntry.js',
        common: 'common@http://localhost:3001/remoteEntry.js'
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
      exposes: {
        './Widget': path.resolve(__dirname, 'src/index'),
      },
      output: {
        publicPath: '//localhost:3001/vue/',
      },
    },
    default: {
      output: {
        publicPath: '//localhost:3003/',
      },
    },
  },
};
