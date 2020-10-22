import Vue from 'vue';
import Router from 'vue-router';
import {loadComponent} from '@/util';
import mqjInstall from '@/mqj/install'

Vue.use(Router);
Vue.use(mqjInstall);
// 这里有个坑，需要先import再使用loadComponent
import('./routerComponents');

// 解决自己跳转自己报错问题
const originalPush = Router.prototype.push
  Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
console.log(Vue.prototype.$mqj.naver.currModuleMenu,'.naver.currModuleMenu')
export default new Router({
  routes: [
    // {
    //   path: '/list',
    //   name: 'HelloWorld',
    //   component: loadComponent('app3', './hello')
    // },
    // {
    //   path: '/goods/list',
    //   name: 'test',
    //   component: loadComponent('app3', './pages', 'GoodsList')
    // }

    {
      path: '/goods',
      // name: '商品管理',
      component: loadComponent('app3', './hello'),
      children: [
        {
          path: 'list',
          // name: '列表',
          component: loadComponent('app3', './pages', 'GoodsList'),
        }, 
      ]
    }
  ]
});

