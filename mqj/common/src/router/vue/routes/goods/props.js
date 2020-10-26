import {loadComponent} from '@/util';

export default {
  path: '/props',
  name: '属性管理',
  // component: loadComponent('app3', './hello'),
  children: [
    {
      path: '/list',
      name: '销售属性',
      component: loadComponent('goods', './pages', 'PropsList'),
    }, 
  ]
}