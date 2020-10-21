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
        app3: 'app3@http://localhost:3003/remoteEntry.js',
        // app2: 'app2@http://localhost:3002/remoteEntry.js',
      },
      exposes: {
        './C1': path.resolve(__dirname, 'src/widgets/test/index'),
        './C2': path.resolve(__dirname, 'src/widgets/test2/index.vue'),
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
        app3: 'vue@http://localhost:3001/vue/remoteEntry.js',
        app2: 'react@http://localhost:3001/react/remoteEntry.js',
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
