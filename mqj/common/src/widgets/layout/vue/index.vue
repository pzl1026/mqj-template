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
        v-model="current"
      >
        <a-sub-menu v-for="item in menu" :key="item.path">
          <span slot="title" class="submenu-title-wrapper">
            <a-icon type="appstore" />
            <span>{{item.name}}</span>
          </span>
          <a-menu-item :key="child.path" v-for="child in item.children" @click="toPush(child, item.path)">
            <a-icon type="appstore" />
            <span>{{child.name}}</span>
          </a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-layout-header>
    <a-layout-content class="layout-content">
      <div class="sec-menu">
        <a-breadcrumb :style="{ margin: '16px 0'}" class="sec-menu-left">
          <a-breadcrumb-item v-for="bread in breadcrumb" :key="bread.path">
            <router-link :to="bread.path">{{bread.name}}</router-link>
          </a-breadcrumb-item>
        </a-breadcrumb>
        <div class="sec-menu-right">
          <a-dropdown placement="bottomRight">
            <a class="ant-dropdown-link" @click="e => e.preventDefault()">
              最近访问 <a-icon type="down" />
            </a>
            <a-menu slot="overlay">
              <a-menu-item v-for="link in recent" :key="link.updateTime">
                <!-- <router-link :to="link.path">{{bread.name}}</router-link> -->
                <!-- <a @click="toRecent(link)"> -->
                <div class="recent-item" @click="toRecent(link)">
                  {{link.title}}<br/>
                  {{link.href}}
                </div>
                <!-- </a> -->
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </div>
      </div>
      <div class="layout-content-body">
        <!-- <h2 @click="toTest">toTest</h2>
        <h2 @click="toHello">toHello</h2> -->
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
        breadcrumb:[],
        recent: [],
        mqj: this.$mqj,
        naver: this.$mqj.naver,
        menu: this.$mqj.naver.currModuleMenu
      };
    },
    watch: {
      '$route' (to, from) {
        this.breadcrumb = this.naver.setBreadcrumb(to);
        this.recent = this.naver.saveStore(to);
      }
    },
    created() {
      console.log(this.$mqj.naver.currModuleMenu, 'this')
    },

    updated: function () {
    //  this.breadcrumb = this.mqj.naver.setBreadcrumb();
    },
    
    methods: {
      // toHello() {
      //   this.$router.push({
      //     path: '/list',
      //   });
      // },
      // toTest() {
      //   this.$router.push({
      //     path: '/test',
      //   });
      // },
      toPush (nav, parentPath) {
        this.$router.push({
          path: nav.path,
        });
      },

      toRecent (link) {
        this.naver.isCurrModule(link)
        .then(res => {
          this.$router.push(res);
        }, res => {
          window.location.href = res;
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
.sec-menu{
  display: flex;
}
.sec-menu-left{
  flex: 1;
}
.sec-menu-right{
  display: flex;
  margin: 16px 0;
  justify-content: flex-end;
  width: 100px;
}

.recent-item{
  max-width: 300px;
  white-space:normal;
  word-break:break-all;
}
</style>