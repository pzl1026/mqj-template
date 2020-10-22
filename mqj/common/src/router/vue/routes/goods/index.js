const route = [
  {
    path: '/list',
    name: 'HelloWorld',
    component: loadComponent('app3', './hello')
  },
  {
    path: '/test',
    name: 'test',
    component: loadComponent('app3', './pages', 'Test')
  }
];

export default nav;