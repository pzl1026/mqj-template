const path = require('path');
const pagesArgs = {
  goods: [
    {name: 'list', path: 'goods/list'}, 
    {name: 'info', path: 'goods/info'}, 
    {name: 'props', path: 'props/list'}, 
  ],
};

function pagePath(pagesArgs) {
  let pagesModule = {};
  for(let [k,v] of Object.entries(pagesArgs)) {
    v.forEach(item => {
      if (typeof(item) == 'string') {
        pagesModule['./' + item] = path.resolve(__dirname, `${k}/${item}`)
      }
      if (typeof(item) == 'object') {
        pagesModule['./' + item.name] = path.resolve(__dirname, `${k}/${item.path}`)
      }
      
    })
  }
  return pagesModule;
}

module.exports = pagePath(pagesArgs);