<template>
  <div class="login-container">
    <div class="container">
      <div class="welcome">
        <h2 class="title">
          <p class="text">WELCOME</p>
          <p class="text">OPEN PLATFORM</p>
          <p class="line"></p>
          <p class="main-title">开放平台</p>
        </h2>
        <img class="logo" src="@/assets/logo/logo3.png" alt="logo"/>
      </div>
      <div class="login-body">
        <div class="login-body-content">
          <a-form
            :model="form"
            :rules="rules"
            :label-col="{ span: 0 }"
            :wrapper-col="{ span: 24 }"
          >
            <a-form-item v-bind="validateInfos.username">
              <a-input
                v-model:value="form.username"
                placeholder="账号"
              >
                <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
              </a-input>
            </a-form-item>
            <a-form-item v-bind="validateInfos.password">
              <a-input
                v-model:value="form.password"
                type="password"
                placeholder="密码"
              >
                <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
              </a-input>
            </a-form-item>
            <a-form-item :wrapper-col="{ span: 24 }" style="margin-bottom:0">
              <a-row type="flex" justify="center" align="middle">
                <a-button class="login" type="primary" html-type="submit" @click="submit" :loading="loading">
                  登录
                </a-button>
              </a-row>
            </a-form-item>
          </a-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Api from './api';
import {TOKEN, PERMISSION} from '@/mqj/mqj.config';
import App from '@/mqj/mqjls';
import {useLogin} from './login';
import {message} from 'ant-design-vue';

export default {
  data () {
    return {
      formLayout: 'horizontal',
      loginForm: null
    };
  },

  setup (props, context) {
    const {
      form,
      rules,
      submit,
      validateInfos,
      loading
    } = useLogin(context);

    message.destroy();
    return {
      form,
      rules,
      submit,
      validateInfos,
      loading
    };
  }
};
</script>

<style lang="sass">
  p {
    margin: 0;
  }
  .login-container{
    display: flex;
    justify-content: center;
    align-items: center;
    background-color:#284ECB;
    width: calc(100vw);
    height: calc(100vh);
    .container {
      width: 812px;
      height: 500px;
      position: relative;
      .welcome {
        position: absolute;
        z-index:99999;
        left: 0;
        top: 0;
        width: 300px;
        height: 500px;
        background-color:#4AA4FF;
        border: 1px solid #66a3fe;
        border-radius: 0 80% 80% 0/172%;
        box-shadow: 0px 5px 50px rgb(84 71 71 / 30%);
        .title {
          color: #fff;
          font-size: 32px;
          margin: 46px 0 0 23px;
          .text {
            line-height: 37px;
          }
          .line {
            width: 60px;
            height: 4px;
            background-color: #fff;
            margin: 19px 0 14px 0;
          }
          .main-title {
            font-size: 40px;
          }
        }
        .logo {
          object-fit: contain;
          position: absolute;
          left: 23px;
          bottom: 34px;
          width: 154px;
          height: 84.85px;
        }
      }
    }
    input {
      height: 40px;
      width: 100%;
    }
    .ant-row {
      // margin-bottom: 40px;
    }
    .login {
      border-radius: 20px;
      width: 124px;
      height: 38px;
      // margin-top: 20px;
      margin-left: 304px;
    }
  }
  
  .login-body {
    position: absolute;
    left: 210px;
    top: 22px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 600px;
    height: 460px;
    background-color: #fff;
    border-radius: 5px;
    padding: 40px;
  }

  .login-body-content {
    display: flex;
    align-items: center;
    width: 408px;
    height: 290px;
    margin-left: 70px;
  }

  .login-body-content h3 {
    font-size: 24px;
    margin-bottom: 60px;
  }
  .login-body-content h4 {
    color: #d1c7b7;
    margin-bottom: 20px;
  }
</style>