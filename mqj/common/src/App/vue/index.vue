<template>
  <a-layout id="app">
    <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%' }">
      <div class="logo" />
      <!--     :default-selected-keys="['3']"
        :open-keys.sync="openKeys" -->
      <a-menu
        theme="dark"
        mode="horizontal"
        :style="{ lineHeight: '64px' }"
        :inline-collapsed="collapsed"
        v-model="current"
      >
        <a-sub-menu key="1">
          <span slot="title" class="submenu-title-wrapper" @click="toTest"><a-icon type="appstore" /><span>toTest</span></span>
        </a-sub-menu>
        <a-sub-menu key="2">
          <span slot="title" class="submenu-title-wrapper" @click="toHello"><a-icon type="appstore" /><span>toHello</span></span>
        </a-sub-menu >
        <a-sub-menu key="3">
          <span slot="title" class="submenu-title-wrapper"><a-icon type="appstore" /><span>Navigation Two</span></span>
          <a-menu-item key="5">
            Option 5
          </a-menu-item>
          <a-menu-item key="6">
            Option 6
          </a-menu-item>
          <a-sub-menu key="sub3" title="Submenu">
            <a-menu-item key="7">
              Option 7
            </a-menu-item>
            <a-menu-item key="8">
              Option 8
            </a-menu-item>
          </a-sub-menu>
        </a-sub-menu>
      </a-menu>
    </a-layout-header>
    <a-layout-content class="layout-content">
      <a-breadcrumb :style="{ margin: '16px 0' }">
        <a-breadcrumb-item>Home</a-breadcrumb-item>
        <a-breadcrumb-item>List</a-breadcrumb-item>
        <a-breadcrumb-item>App</a-breadcrumb-item>
      </a-breadcrumb>
      <div class="layout-content-body">
        <h2 @click="toTest">toTest</h2>
        <h2 @click="toHello">toHello</h2>
        <router-view/>
      </div>
    </a-layout-content>
  </a-layout>
</template>

<script>
import {loadComponent} from '@/util';

export default {
    name: 'App',
    data() {
      return {
        current: ['1'],
        openKeys: ['sub1'],
        collapsed: false,
      };
    },
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
  color: #2c3e50;
}

#app .logo {
  width: 120px;
  height: 31px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px 24px 16px 0;
  float: left;
}

.layout-content{
  padding: 0 50px; 
  margin-top: 64px;
  height: calc(100vh - 64px);
}

.layout-content-body{
  background: #fff;
  padding: 24px;
  min-height: 380px;
}
</style>