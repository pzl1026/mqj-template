import ajax from '@/util/r';
import {AUTHORIZATION, TOKEN, X_ACCOUNT_TYPE, MQJ_TOKEN}from '@/mqj/mqj.config';

export default {
  // 登录
  login (data = {}) {
    return ajax.post('/admin/login', {
      ...data
    });
  },
  userInfo (data = {}) {
    return ajax.get('/admin/userinfo', {params: {...data}});
  },
  
};