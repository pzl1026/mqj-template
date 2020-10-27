class HistostyStore {
  constructor(moduleName) {
    this._moduleName = moduleName;
    this.recentNav = [];
    this.reactAllNav = [];
    this._path = [];
    this._bindPopPath();
  }

  _init () {
    this.savePath();
  }

  // 保存已经访问过的路径
  savePath() {

  }

  // 从local获取本地访问的路径
  getAllPath() {

  }

  // 删除某个最近的访问路径
  removePath() {

  }
  
  // 对浏览器url修改进行监听
  _bindPopPath() {
    window.addEventListener('popstate', (e) => {
      console.log(e, e.state, 'eee')
      let path = e.state && e.state.path;
      this._path.push(path);
      console.log(this._path, 'this._path')
      // this._router[path] && this._router[path]();
    });
  }

}
console.log(777)
export default HistostyStore;