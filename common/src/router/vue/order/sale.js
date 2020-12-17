import {loadComponent} from '@/util';

export default {
  path: '/sale',
  name: '售后',
  // component: loadComponent('app3', './hello'),
  children: [
    {
      path: '/list',
      name: '售后列表',
      component: loadComponent('order', './pages', 'SaleList'),
    }, 
  ]
}