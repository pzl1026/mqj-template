<template>
  <div>  
    <h1>这里是商品列表112</h1>
    <!-- <Common /> -->
    <CommonTest />
  </div>
</template>

<script>
// import('common/util').then(res => {
//   console.log(res, '这里可以引用common/util的模块22');
// })
import {loadComponent} from '@/util';

export default {
   components: { 
      // Common: loadComponent("common", './components', 'Common'), 
    },
}


</script>