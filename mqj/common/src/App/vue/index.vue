<template>
  <div id="app">
    <h2 @click="toTest">toTest</h2>
    <h2 @click="toHello">toHello</h2>
    <router-view/>
  </div>
</template>

<script>
import {loadComponent} from '@/util'
export default {
    name: 'App',
    methods: {
      toHello() {
        this.$router.push({
          path: '/list',
        });
      },
      toTest() {
        this.$router.push({
          path: '/test',
        });
      }
    },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>