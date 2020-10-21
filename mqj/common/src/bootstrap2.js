import Vue from 'vue';
// import App from './App.vue';
// import router from './router';


// const App = import("app3/app").then((App) => {
//   Vue.config.productionTip = false;
//   console.log(App, 'App3');
//   /* eslint-disable no-new */

// });
const test = import("app3/test").then(res => {
  console.log(res, 'test');
});
function loadComponent(scope, module) {
  console.log(scope, module, 'module')
  return async () => {
    // Initializes the share scope. This fills it with known provided modules from this build and all remotes
    await __webpack_init_sharing__("default");

    const container = window[scope]; // or get the container somewhere else
    // Initialize the container, it may provide shared modules
    await container.init(__webpack_share_scopes__.default);
    const factory = await window[scope].get(module);
    const Module = factory();
    return Module;
  };
}

new Vue({
  el: '#root',
  // router,
  components: { App: loadComponent("app3", './app') },
  template: '<App/>',
});

