import {MAX_RECENT_NUM, RECENT_LOCAL} from './mqj.config';

class Nav {
  constructor (navs) {
    this.navs = navs;  // 所配置的所有路由
    this.currModuleMenu = null; //当前模块的菜单
    this.menuRouter = []; //当前模块的路由
    this.breadcrumb = []; //当前页面的面包屑
    this.currModule = '';  // 当前模块的名称，如‘goods’
    this.recentPaths = [];  //最近访问的
    this.activeRouter = null;  //当前router对象
    this.currentParams = {};
    this.currentQuery = {};
    this.getModuleByUrl();
    this.getCurrentMenuProps();
  }

  setCurrentParamsQuery (params, currentQuery) {
    this.currentParams = params;
    this.currentQuery = currentQuery;
  }

  // 获取当前的所展示的模块
  // 从url判断获取nav
  getModuleByUrl () {
    // let exp = new RegExp('(?<=(?:http|https)\:\/\/(?:.*)\/)(.*)(?=#)');
    let exp = new RegExp('(?:(?:http|https)\:\/\/(?:.*)\/)(.*)(?=#)');

    let moduleName =  window.location.href.match(exp) && window.location.href.match(exp)[1];

    this.currModuleMenu = this.navs[moduleName || 'asst'];
    console.log(this.currModuleMenu, 'this.currModuleMenu')
    this.currModule = moduleName;
    this.handleRouterFlat(this.currModuleMenu, moduleName);
    // 过滤一下账号菜单
    this.currModuleMenu = this.currModuleMenu.filter(item => {
      return item.path != '/account';
    });
  }

  // 将路由转变为vue-router所需要的结构,设置为一级path
  handleRouterFlat (menu, moduleName, parentPath = '') {
    menu.forEach(item => {
      let o = {
        ...item,
        module: moduleName,
        originPath: item.path,
        parentPath
      };

      item.path = o.path = parentPath + item.path;
      delete o.children;
      this.menuRouter.push(o);
      if (item.children) {
        this.handleRouterFlat(item.children, moduleName, o.path);
        // delete item.children;
      }
    });
  }

  // 获取当前某个菜单的属性
  getCurrentMenuProps () {
    let exp = new RegExp('[a-z0-9A-Z]{1,}(?!.*[a-z0-9A-Z]{1,})');

    let currMenu = window.location.href.match(exp)[0];
  }

  // breadcrumb
  setBreadcrumb (to) {
    // let exp = new RegExp('(?<=#)(.*)');
    let exp = new RegExp('#(.*)');

    let path = window.location.href.match(exp)[1];

    let paths = path.split('/').filter(n => n);
    // let bPaths = this.getBreadPaths(paths);

    let breadcrumb = [];

    paths.forEach(item => {
      let [path, ] = item.split('?');

      let pathExp = new RegExp('/' + path);
      
      let isset = this.menuRouter.find(n => {
        // 不同管理里面可能有相同的path，如都有'/list'这样的路径，必须要确定哪个管理下的
        return pathExp.test(n.originPath) && paths[0] == n.path.substr(1, paths[0].length);
      });

      if (isset) {
        breadcrumb.push(isset);
      }
    });
    this.breadcrumb = breadcrumb;
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

  // 存储最近访问路径
  saveStore (to) {
    let allRecent = localStorage.getItem(RECENT_LOCAL);

    allRecent = allRecent ? JSON.parse(allRecent) : [];
    let isset = this.menuRouter.find(n => {
      return  to.matched && to.matched.length && n.path == to.matched[0].path;
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

      if (isset.cacheMore) {
        allRecent.push(recent);
      } else {
        if (!allRecent.find(n => n.path == isset.path)) {
          allRecent.push(recent);
        } else {
          allRecent.forEach(item => {
            if (item.path == recent.path) {
              item.updateTime = updateTime;
            }
          });
        }
      }
    }

    allRecent = allRecent.sort((a, b) => b.updateTime - a.updateTime).slice(0, MAX_RECENT_NUM);
    localStorage.setItem(RECENT_LOCAL, JSON.stringify(allRecent));
    this.recentPaths = allRecent;
    return allRecent;
  }

  // 判断是否是当前module展示
  isCurrModule (recentLink) {
    return new Promise((resolve, reject) => {
      if (recentLink.module == this.currModule) {
        let path = {
          path: recentLink.realPath,
          query: recentLink.query
        };

        resolve(path);
      } else {
        reject(recentLink.href);
      }
    });
  }

  // 针对没有搜索到相应模块或者相应的路径做处理
  handleErrPath (R) {
    R.afterEach((to, from) => {
      /* 必须调用 `next` */
      const menuRouter = this.menuRouter;

      const [, path] = location.hash.split('#');

      if (!menuRouter.find(n => n.path == path)) {
        let cr = menuRouter.find(n => n.component);

        R.push({
          path: cr.path
        });
      } else {
        if (menuRouter.find(n => !n.component)) {
          let childRouter = menuRouter.filter(m => m.component);

          let cr = childRouter
            .filter(n => n.path.indexOf(path) > -1 && n.path.indexOf(':') == -1)
            .sort((a, b) => b.path.length - a.path.length)[0];

          R.push({
            path: cr.path
          });
        }
      }
    });
  }

  getMenuActive(path) {
    if (/\/account/.test(path)) return;
    let pathActive = '';
    let handle = (path) => {
      let currentRoute = this.menuRouter.find(m => m.path == path);
      if (currentRoute) {
        if (currentRoute.hidden){
          handle(currentRoute.parentPath);
        } else {
          console.log(currentRoute.path, 'currentRoute.path9988')
          pathActive = currentRoute.path;
        }
      }
    }
    handle(path);
    return pathActive;
  }
}

export default Nav;