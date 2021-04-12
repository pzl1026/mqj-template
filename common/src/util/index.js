import ajax from './r';

export function loadComponent (scope, module, component) {
  return async () => {
    // Initializes the share scope. This fills it with known provided modules from this build and all remotes
    await __webpack_init_sharing__("default");

    const container = window[scope]; // or get the container somewhere else
    // Initialize the container, it may provide shared modules

    await container.init(__webpack_share_scopes__.default);
    const factory = await window[scope].get(module);
    const Module = factory();

    if (component) {
      return Module.default[component];
    }
    return Module;
  };
}

export function loadPage (module, name, context) {
  // console.log(process.env.NODE_ENV , 'process.env.NODE_ENV ')
  // if(process.env.NODE_ENV == 'dev') {
  //   return loadComponent(module, './pages', name);
  // } else {
  //   console.log(`${module}/${name}`, 'hhgggggg');
  //   return () => import(`${module}/${name}`);
  // }
  return () => import(`${module}/${name}`);
}

export function getLocalItem (s, is2Obj = true) {
  let val = localStorage.getItem(s);

  return val ? (is2Obj ? JSON.parse(val) : val) : null;
}

export function o2Value (o1, o2) {
  for (let [k, v] of Object.entries(o1)) {
    o1[k] = o2[k];
  }
}

export const r = ajax;