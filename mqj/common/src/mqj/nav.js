

class Nav {
  constructor(navs) {
    this.navs = navs;
    this.currModuleMenu = null;
    this.menuRouter = [];
    this.breadcrumb = [];
    this.currModule = '';
    this.recentPaths = [];  //最近访问的
    this.activeRouter= null;  //当前router对象
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
  setBreadcrumb (to) {
    let exp = /(?<=#)(.*)/;
    let path = window.location.href.match(exp)[0];
    let paths = path.split('/').filter(n => n);
    let bPaths = this.getBreadPaths(paths);
    console.log(bPaths, 'bPaths')
    this.breadcrumb = this.menuRouter.filter(route => {
      let testCount = 0;
      // 处理路由上类似/:id的情况
      for(let v of bPaths) {
        let pathExp = new RegExp(v);

        if (pathExp.test(route.path)) {
          testCount++;
        }
      }

      return testCount > 0;
    });
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
    const RECENT_LOCAL = '_mqj_recent';
    let allRecent = localStorage.getItem(RECENT_LOCAL);
    allRecent = allRecent ? JSON.parse(allRecent) : [];
    let isset = this.menuRouter.find(n => {
      return n.path == to.matched[0].path;
    });

    if (isset) {
      let updateTime = new Date().valueOf();
      let recent = {
        name: isset.name,
        title: this.breadcrumb.map(m => m.name).join(' / '),
        path: isset.path,
        realPath: to.path,
        module: isset.module,
        updateTime,
        href: window.location.href,
        query: to.query,
        params: to.params
      };
      if (!allRecent.find(n => n.path == isset.path)) {
        allRecent.push(recent);
      } else {
        allRecent.forEach(item => {
          if (item.path == recent.path) {
            item.updateTime = updateTime;
          }
        })
      }
    }

    allRecent = allRecent.sort((a,b) => b.updateTime - a.updateTime).slice(0, MAX_RECENT_NUM);
    localStorage.setItem(RECENT_LOCAL,JSON.stringify(allRecent));
    this.recentPaths = allRecent;
    return allRecent;
  }

  // 判断是否是当前module展示
  isCurrModule(recentLink) {
    return new Promise((resolve, reject) => {
      console.log(recentLink.module, this.currModule, 'module');
      if (recentLink.module == this.currModule) {
        let path = {
          path: recentLink.realPath,
          query: recentLink.query
        }
        resolve(path);
      } else {
        console.log(recentLink.href, 'recentLink.href')
        reject(recentLink.href);
      }
    });
  }

  // 判断是否是当前module展示的同时代入了某些参数

}

export default Nav;



