import Vue, { createApp } from 'vue';
import App from './App/vue';
import {createRouter, createWebHashHistory} from 'vue-router';
import routes from '@/router/vue';
import Nav from '@/mqj/nav';
import 'ant-design-vue/dist/antd.css';
// 这里有个坑，要先加载
import('./routerComponents');

const app = createApp(App);
app.config.productionTip = false;
let naver = new Nav(routes);
app.config.globalProperties.$mqj = {
  naver
}

const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHashHistory(),
  routes: naver.menuRouter, // short for `routes: routes`
})
app.use(router);
app.mount('#root')



