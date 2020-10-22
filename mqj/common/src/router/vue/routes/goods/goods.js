import {loadComponent} from '@/util';

export default {
  path: '/goods',
  name: '商品管理',
  // component: loadComponent('app3', './pages', 'Goods'),
  children: [
    {
      path: '/list',
      name: '列表',
      component: loadComponent('app3', './pages', 'GoodsList'),
    }, 
  ]
}