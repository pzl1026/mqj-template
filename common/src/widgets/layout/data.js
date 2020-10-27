export const navs = {
  goods: {
    title: '商品中心',
    path:'goods',
    menu: [
      {
        title: '类目管理',
        path: 'category',
        key: 'category',
        children: [{
          title: '前台类目',
          key: 'usercategory',
          path: 'usercategory',
        }],
      },
      {
        title: '商品管理',
        path: 'list',
        key: 'list',
      }
    ]
  },
  order: {
    title: '订单中心',
    path: 'order',
    menu:[
      {
        title: '订单管理',
        path: 'manage',
        key: 'manage',
        children: [{
          title: '订单列表',
          key: 'list',
          path: 'list',
        }]
      },
    ],
  }
};