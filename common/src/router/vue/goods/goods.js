import {loadComponent} from '@/util';

export default {
  path: '/goods',
  name: '商品管理',
  // component: loadComponent('app3', './pages', 'Goods'),
  meta: {
    icon: 'UserOutlined',
  },
  children: [
    {
      path: '/list',
      name: '列表',
      // component: loadComponent('goods', './pages', 'GoodsList'),
      component: () => import('goods/list'),
      children: [
        {
          path: '/info/:id',
          name: '商品详情',
          cacheMore: true,
          // component: loadComponent('goods', './pages', 'GoodsInfo'),
          component: () => import('goods/info'),
        }, 
      ]
    }, 
  ]
}