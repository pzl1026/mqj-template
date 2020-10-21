const path = require('path');

module.exports = {
  name: 'app2',
  isTop: false,
  shared: { 
    react: { singleton: true },
    "react-dom": {
      singleton: true, // only a single version of the shared module is allowed
    },
  },
  // library: { type: "var", name: "app2" },
  dev: {
    st1: {
      port: '3002',
      nomocker: false,
      exposes: {
        './C1': path.resolve(__dirname, 'src/widgets/test'),
      },
      remotes: {
        // app3: 'vue@http://localhost:3003/remoteEntry.js',
        common: 'common@http://localhost:3001/remoteEntry.js',
      },
      exposes: {
        './Widget': path.resolve(__dirname, 'src/index'),
        './test': path.resolve(__dirname, 'src/test'),
        './app': path.resolve(__dirname, 'src/App'),
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
      exposes: {
        './Widget': path.resolve(__dirname, 'src/index'),
        './test': path.resolve(__dirname, 'src/test'),
      },
      output: {
        publicPath: '//localhost:3001/react/',
      },
    },
    default: {
      output: {
        publicPath: '//localhost:3002/',
      },
    },
  },
};
