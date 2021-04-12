import {
  loadComponent,
  getLocalItem
} from '@/util';
import {MQJ_TOKEN, USERINFO, PERMISSION} from '@/mqj/mqj.config';
import r from '@/util/r';

let utils = {
  $mqjUtil: {
    loadComponent,
    r,
  },
  $userInfo: getLocalItem(USERINFO),
  $permisson: getLocalItem(PERMISSION),
  $token: getLocalItem(MQJ_TOKEN, false)
};

export function utilInstall (app, utilArgs) {
  let us = Object.assign({}, utilArgs,  utils);

  for (let [k, u] of Object.entries(us)) {
    app.config.globalProperties[k] = u;
  }
}