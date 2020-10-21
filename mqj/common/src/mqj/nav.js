

class Nav {
  constructor(navs) {
    this.navs = navs;
    this.currModuleMenu = null;
    this.getModuleByUrl();
    this.getCurrentMenuProps();
  }

  // 获取当前的所展示的模块
  // 从url判断获取nav
  getModuleByUrl() {
    let exp = /(?<=(?:http|https)\:\/\/(?:.*)\/)(.*)(?=#)/;
    let moduleName = window.location.href.match(exp)[0];
    this.currModuleMenu = this.navs[moduleName || 'goods'];
  }

  // 获取当前某个菜单的属性
  getCurrentMenuProps() {
    this.setTitle();
    let exp = /[a-z0-9A-Z]{1,}(?!.*[a-z0-9A-Z]{1,})/;
    let currMenu = window.location.href.match(exp)[0];
  }

  findMenuByPath() {
    
  }

  // 设置页面title
  setTitle() {

  }
}

export default Nav;



