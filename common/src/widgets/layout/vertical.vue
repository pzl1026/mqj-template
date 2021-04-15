<template>
  <a-config-provider :locale="zhCN">
  <transition name="slide-fade" v-if="isLogin">
    <router-view/>
  </transition>
  <a-layout v-else>
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
      <div class="logo">
        <img src="@/assets/logo.png" width="101" height="55" alt="logo"/>
      </div>
      <a-menu
        theme="dark"
        mode="inline"
        :style="{ lineHeight: '64px' }"
        v-model:selectedKeys="current"
      >
        <a-sub-menu v-for="item in menu" :key="item.path">
          <template #title>
            <span class="submenu-title-wrapper">
              <component :is="item.meta && item.meta.icon"/>
              <span>{{item.name}}</span>
            </span>
          </template>
          <a-menu-item :key="child.path" v-for="child in item.children" @click="toPush(child, item.path)">
            <!-- <AppstoreOutlined /> -->
            <span>{{child.name}}</span>
          </a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0 20px">
        <a-row type="flex" justify="space-between">
          <a-col :span="1">
            <menu-unfold-outlined
              v-if="collapsed"
              class="trigger"
              @click="changeCollapsed"
            />
            <menu-fold-outlined v-else class="trigger" @click="changeCollapsed"/>
          </a-col>
          <a-col :span="1" >
            <a-dropdown placement="bottomRight">
              <div class="nav-admin">
                <a-avatar :size="40">
                  <template #icon><UserOutlined /></template>
                </a-avatar>
              </div>
              <template #overlay>
                <a-menu>
                  <!-- <a-menu-item>
                    <a href="javascript:;" @click="changeModuleShow(true)">所有模块</a>
                  </a-menu-item> -->
                  <a-menu-item>
                    <a href="javascript:;">退出登录</a>
                  </a-menu-item>
                </a-menu>
              </template>
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
              <template #overlay>
                <a-menu slot="overlay">
                  <a-menu-item v-for="link in recent" :key="link.updateTime">
                    <div class="recent-item" @click="toRecent(link)">
                      {{link.title}}<br/>
                      {{link.href}}
                    </div>
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </div>
        </div>
        <div class="layout-content-body">
          <router-view v-slot="{ Component }">
            <transition name="slide-fade">
              <component :is="Component" />
            </transition>
          </router-view>
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
  </a-config-provider>
</template>

<script>
import { MODULES } from '@/mqj/mqj.config';
import {
  Layout, 
  Row, 
  Col, 
  Icon, 
  Modal, 
  Breadcrumb, 
  Dropdown, 
  Avatar, 
  Menu 
} from 'ant-design-vue';
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  AppstoreOutlined
} from '@ant-design/icons-vue';
import {MQJ_TOKEN, USERINFO, PERMISSION, AUTHORIZATION, TOKEN} from '@/mqj/mqj.config';
const COLLAPSED = '_xy_collapsed';

export default {
  components: {
    ALayout: Layout,
    ARow: Row,
    ACol: Col,
    AIcon: Icon,
    AModal: Modal,
    ABreadcrumb: Breadcrumb,
    ABreadcrumbItem: Breadcrumb.Item,
    ALayoutHeader: Layout.Header,
    ALayoutSider: Layout.Sider,
    ALayoutContent: Layout.Content,
    ADropdown: Dropdown,
    AAvatar: Avatar,
    AMenu: Menu,
    ASubMenu: Menu.SubMenu,
    AMenuItem: Menu.Item,
    AMenuItemGroup: Menu.ItemGroup,
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    AppstoreOutlined
  },
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
      MODULES,
      isLogin: false,
      zhCN,
      userInfo: JSON.parse(localStorage.getItem(USERINFO))
    };
  },
  watch: {
    '$route' (to, from) {
      this.breadcrumb = this.naver.setBreadcrumb(to);
      this.recent = this.naver.saveStore(to);
      this.changeIsLogin(to);
      this.naver.setCurrentParamsQuery(to.params, to.query);
      this.current = [this.naver.getMenuActive(to.path)];
    }
  },
  created() {
    this.collapsed = localStorage.getItem(COLLAPSED) == 'true' ? true : false;
    // this.menu = this.getMenu(this.$mqj.naver.currModuleMenu);
    console.log(this.menu, 'ddd');
  },

  methods: {
    getMenu (menu = []) {
      return menu.filter(item => {
        if (item.children && item.children.length) {
          item.children = this.getMenu(item.children);
        }
        return item.hidden != true;
      });
    },
    changeCollapsed () {
      this.collapsed = !this.collapsed ;
      localStorage.setItem(COLLAPSED, this.collapsed);
    },

    toPush (nav, parentPath) {
      this.$router.push({
        path: nav.path,
      });
    },
    changeIsLogin (to) {
      if (/\/account/.test(to.path)) {
        this.isLogin = true;
        localStorage.removeItem(USERINFO);
        localStorage.removeItem(PERMISSION);
        localStorage.removeItem(MQJ_TOKEN);
        localStorage.removeItem(AUTHORIZATION);
        localStorage.removeItem(TOKEN);
      } else {
        this.isLogin = false;
      }
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
<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
#app .logo {
  width: 120px;
  height: 31px;
  /* background: rgba(255, 255, 255, 0.2); */
  margin: 16px 24px 16px 0;
  float: left;
}
.layout-content{
  padding: 0 24px; 
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
.slide-fade-enter-from, .slide-fade-leave-to{
  transform: translateY(20px);
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
.logo {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 32px;
  margin: 16px;
}
.logo img{
  object-fit: contain;
  width: 100%;
  height: 100%;
}
.trigger:hover {
  color: #1890ff;
}
.trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 23px 20px 23px 0;
  cursor: pointer;
  transition: color 0.3s;
}
</style>