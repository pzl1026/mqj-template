<template>
  <a-layout id="app">
    <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%' }">
      <a-row type="flex" justify="end">
        <a-col :span="3">
             <div class="logo" />
        </a-col>
        <a-col :span="20">
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
        </a-col>
        <a-col :span="1" >
          <a-dropdown placement="bottomRight">
            <div class="nav-admin">
              <a-avatar :size="40" icon="user" />
            </div>
            <a-menu slot="overlay">
              <a-menu-item>
                <a href="javascript:;" @click="changeModuleShow(true)">所有模块</a>
              </a-menu-item>
              <a-menu-item>
                <a href="javascript:;">退出登录</a>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </a-col>
      </a-row>
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
        <transition name="slide-fade">
          <router-view :beforeEnter="beforeEnter"/>
        </transition>
      </div>
    </a-layout-content>
    <a-modal 
    v-model="moduleShow" 
    title="所有模块" 
    @cancel="changeModuleShow(false)" 
    :footer="null"
    :width="1000">
      <a-row :gutter="[16, 16]">
        <a-col class="gutter-row" :span="4" v-for="m in MODULES" :key="m.name" >
          <div class="gutter-box" @click="toModule(m)">
            <a-icon :type="m.icon" :style="{ fontSize: '40px' }"/>
            <span>{{m.name}}</span>
          </div>
        </a-col>
      </a-row>
    </a-modal>
  </a-layout>
</template>

<script>
import {loadComponent} from '@/util';
import {MODULES} from '@/mqj/mqj.config';
console.log(2222222)
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
        menu: this.$mqj.naver.currModuleMenu,
        moduleShow: false,
        MODULES
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
      },

      beforeEnter (to,from, next) {
        cosnole.log(to,from, 'totoo')
      },

      toModule (m) {
        location.href = m.path;
      },

      changeModuleShow (show) {
        this.moduleShow = show;
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

.nav-admin{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.slide-fade-enter-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-leave-active {
  transition: all 0s;
}
.slide-fade-enter, .slide-fade-leave-to{
  transform: translateY(10px);
  opacity: 0;
}
.ant-modal-close-x{
  display: flex!important;
  justify-content: center;
  align-items: center;
  line-height: 56px!important;
}
.gutter-box{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.gutter-box span{
  line-height: 30px;
}
</style>