import Vue from 'vue';
import Router from 'vue-router';
import {loadComponent} from '@/util';

Vue.use(Router);
// 这里有个坑，需要先import再使用loadComponent
import('./routerComponents');

export default new Router({
  routes: [
    {
      path: '/list',
      name: 'HelloWorld',
      component: loadComponent('app3', './hello')
    },
    {
      path: '/test',
      name: 'test',
      component: loadComponent('app3', './pages', 'Test')
    }
  ]
});

