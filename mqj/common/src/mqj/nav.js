

class Nav {
  constructor(navs) {
    this.navs = navs;
    this.currModuleMenu = null;
    this.menuRouter = [];
    this.getModuleByUrl();
    this.getCurrentMenuProps();
  }

  // 获取当前的所展示的模块
  // 从url判断获取nav
  getModuleByUrl() {
    let exp = /(?<=(?:http|https)\:\/\/(?:.*)\/)(.*)(?=#)/;
    let moduleName = window.location.href.match(exp)[0];
    this.currModuleMenu = this.navs[moduleName || 'goods'];
    this.handleRouterFlat(this.currModuleMenu);
  }

  // 将路由转变为vue-router所需要的结构,设置为一级path
  handleRouterFlat(menu, parentPath = '') {
    menu.forEach(item => {
      item.path = parentPath + item.path;
      let o = {
       ...item
      }
      delete o.children;
      this.menuRouter.push(o);

      if (item.children){
        this.handleRouterFlat(item.children, item.path);
        // delete item.children;
      }
    })
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



