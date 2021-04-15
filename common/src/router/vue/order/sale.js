import {loadComponent} from '@/util';

export default {
  path: '/sale',
  name: '售后',
  meta: {
    icon: 'UserOutlined',
  },
  // component: loadComponent('app3', './hello'),
  children: [
    {
      path: '/list',
      name: '售后列表',
      // component: loadComponent('order', './pages', 'SaleList'),
      component: () => import('order/sale'),
    }, 
  ]
}