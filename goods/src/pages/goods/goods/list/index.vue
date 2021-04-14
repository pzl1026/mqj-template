<template>
  <div>  
    <h1>这里是商品列表112</h1>
    <!-- <Common /> -->
    <CommonTest />
    <SearchTable 
    :formItems="formItems" 
    :columns="columns" 
    :api="getData"
    @init="initial"
    >
    <template #action>
      <a>操作</a>
    </template>
    </SearchTable>
  </div>
</template>

<script>
// import('common/util').then(res => {
//   console.log(res, '这里可以引用common/util的模块22');
// })
import {loadComponent} from '@/util';
import {formItems, columns} from './config';
import {getData} from './api';

export default {
  data() {
    return {
      formItems,
      getData,
      columns,
      load: null,
    }
  },
  components: { 
    // Common: loadComponent("common", './components', 'Common'), 
  },
  mounted () {
     setTimeout(() => {
        this.load();
      }, 3000);
  },
  methods: {
    handleData () {
      return []
    },
    initial (load) {
      this.load = load;
    }
  }
}


</script>