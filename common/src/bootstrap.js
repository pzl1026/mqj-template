import Vue, {createApp} from 'vue';
import App from './App/vue';
import {createRouter, createWebHashHistory} from 'vue-router';
import 'ant-design-vue/dist/antd.css';
import routes from '@/router/vue';
import Nav from '@/mqj/nav';
import {componentsInstall} from './globalComponents';
import {utilInstall} from './globalUtil';
import '@/assets/common.scss';

let naver = new Nav(routes);
const app = createApp(App);

componentsInstall(app);
utilInstall(app, {$mqj: {naver}});
app.config.productionTip = false;

const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHashHistory(),
  routes: naver.menuRouter, // short for `routes: routes`
});

app.use(router);
app.mount('#root');