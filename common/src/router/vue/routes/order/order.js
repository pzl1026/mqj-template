import {loadComponent} from '@/util';

export default {
  path: '/order',
  name: '订单管理',
  // component: loadComponent('app3', './hello'),
  children: [
    {
      path: '/list',
      name: '列表',
      component: loadComponent('goods', './pages', 'OrderList'),
    }, 
  ]
}