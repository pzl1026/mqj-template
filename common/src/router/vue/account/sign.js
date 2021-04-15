import Login from '@/widgets/account/login';

export default {
  path: '/account',
  name: '账号',
  // component: Login,
  children: [
    {
      path: '/login',
      name: '登陆',
      component: Login,
    }, 
  ]
};