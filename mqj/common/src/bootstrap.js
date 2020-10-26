import Vue from 'vue';
import App from './App/vue';
import router from './router/vue';
import 'ant-design-vue/dist/antd.css';
// import '@/mqj/loadAntdComponents';
import {install} from 'ant-design-vue';

install(Vue);
new Vue({
  el: '#root',
  router,
  components: { App },
  template: '<App/>',
});




