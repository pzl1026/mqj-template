const nav = {
  goods: {
    title: '商品中心',
    menu: [
      {
        title: '类目管理',
        url: 'http://localhost:3001/goods#/category',
        key: 'category',
        children: [{
          title: '前台类目',
          key: 'goods_usercategory',
          url: 'http://localhost:3001/goods#/category/usercategory',
        }],
      },
      {
        title: '商品管理',
        url: 'http://localhost:3001/goods#/list',
        key: 'shop'
      }
    ]
  },
  order: {
    title: '商品中心',
    menu:[
      {
        title: '运费模板管理',
        url: 'http://localhost:3001/order#/setting',
        key: 'order',
        children: [{
          title: '订单列表',
          key: 'order_list',
          url: 'http://localhost:3001/order#/setting/list',
        }]
      },
    ],
  }
};

// 从url判断获取nav
export function getNavByUrl() {
  let exp = /(?<=(?:http|https)\:\/\/(?:.*)\/)(.*)(?=#)/;
  let moduleName = window.location.href.match(exp)[0];
  return nav[moduleName || 'goods'];
}

function changeTitle(moduleName) {
    nav[moduleName]
}



