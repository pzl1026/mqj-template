import Vue from 'vue';
import App from './App/vue';
import router from './router/vue';
import 'ant-design-vue/dist/antd.css';
// import '@/mqj/loadAntdComponents';
import {install} from 'ant-design-vue';

install(Vue);
// router.beforeEach((to, from, next) => {
//   console.log(to, from, 'to, from')
//   // if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' })
//   // else next()
// })
new Vue({
  el: '#root',
  router,
  components: { App },
  template: '<App/>',
});

