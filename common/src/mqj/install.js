// import mqj from '@/mqj/index';
import routes from '@/router/vue/routes';
import Nav from './nav'

// const naver = new mqj.Nav(routes);
// const navs = naver.currModuleMenu;
// console.log(navs, 'moduleMenu')

export default {
  install: function(Vue, options) {
    Vue.prototype.$mqj = {
      naver: new Nav(routes)
    }
  }
};
