import Vue from 'vue';
import App from './App/vue';
import router from './router/vue';

// import("app3/app")

new Vue({
  el: '#root',
  router,
  // components: { App: loadComponent("app3", './app') },
  components: { App },
  template: '<App/>',
});

