

class Nav {
  constructor(navs) {
    this.navs = navs;
    this.currModuleMenu = null;
    this.menuRouter = [];
    this.breadcrumb = [];
    this.currModule = '';
    this.getModuleByUrl();
    this.getCurrentMenuProps();
  }

  // 获取当前的所展示的模块
  // 从url判断获取nav
  getModuleByUrl() {
    let exp = /(?<=(?:http|https)\:\/\/(?:.*)\/)(.*)(?=#)/;
    let moduleName = window.location.href.match(exp)[0];
    this.currModuleMenu = this.navs[moduleName || 'goods'];
    this.currModule = moduleName;
    this.handleRouterFlat(this.currModuleMenu, moduleName);
  }

  // 将路由转变为vue-router所需要的结构,设置为一级path
  handleRouterFlat(menu, moduleName, parentPath = '') {
    menu.forEach(item => {
      item.path = parentPath + item.path;
      let o = {
       ...item,
       module: moduleName,
      }
      delete o.children;
      this.menuRouter.push(o);
      if (item.children){
        this.handleRouterFlat(item.children, moduleName, item.path);
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

  // breadcrumb
  setBreadcrumb () {
    let exp = /(?<=#)(.*)/;
    let path = window.location.href.match(exp)[0];
    let paths = path.split('/').filter(n => n);
    let bPaths = this.getBreadPaths(paths);
    this.breadcrumb = this.menuRouter.filter(route => bPaths.includes(route.path));
    this.setTitle();
    return this.breadcrumb;
  }

  getBreadPaths (paths) {
    let count = 1;
    let p = [];
    if (paths.length == 0) return;
    while(count <= paths.length) {
      let pathArr = paths.slice(0, count);
      p.push('/' + pathArr.join('/'));
      count++;
    }
    return p;
  }

  // 设置页面title
  setTitle() {

  }

  // 存储最近访问路径
  saveStore(to) {
    const MAX_RECENT_NUM = 5;
    console.log(to,window.location, 'toto')
    let isset = this.menuRouter.find(n => n.path == to.fullPath);
    if (isset) {
      let recentStore = {
        name: isset.name,
        path: isset.path,
        module: isset.module,
        fullPath: window.location.pathname + window.location.hash
      };
      console.log(recentStore, 'recentStore')
    }
   
  }

}

export default Nav;



