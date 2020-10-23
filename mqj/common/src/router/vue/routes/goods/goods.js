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
      children: [
        {
          path: '/info',
          name: '商品详情',
          component: loadComponent('app3', './pages', 'GoodsInfo'),
        }, 
      ]
    }, 
  ]
}