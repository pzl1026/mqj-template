import {loadComponent} from '@/util';

export default {
  path: '/order',
  name: '订单管理',
  meta: {
    icon: 'UserOutlined',
  },
  // component: loadComponent('app3', './hello'),
  children: [
    {
      path: '/list',
      name: '列表',
      // component: loadComponent('order', './pages', 'OrderList'),
      component: () => import('order/list'),
    }, 
  ]
}