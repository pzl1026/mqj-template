setTimeout(() => {
  // loadComponent(aa.app4.scope, aa.app4.module, 'vue')();
  import('app3/Widget').then((res) => {
    console.log(res, 'app3');
  });
}, 2000);

import('app2/Widget');
const test = import('app2/test').then((res) => {
  console.log(res, 'app2');
});

import('./layout');



