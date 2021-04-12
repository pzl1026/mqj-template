import {reactive, getCurrentInstance, toRaw, ref} from 'vue';
import {MQJ_TOKEN, USERINFO} from '@/mqj/mqj.config';
import {useForm} from '@ant-design-vue/use';
import Api from './api';

export function useLogin (context) {
  const form = reactive({
    username: '',
    password: ''
  });

  let loading = ref(false);

  const rules = reactive({
    username: [
      {required: true, message: '账号必填', trigger: 'change'},
    ],
    password: [
      {required: true, message: '密码必填', trigger: 'change'}
    ],
  });
  const g = getCurrentInstance().appContext.config.globalProperties;
  const mu = g.$router;
  const {validate, validateInfos} = useForm(form, rules);

  const submit = (f) => {
    loading.value = true;
    validate()
      .then(() => {
        Api.login(toRaw(form)).then(res => {
          localStorage.setItem(MQJ_TOKEN, res.data);
          Api.userInfo().then(res => {
            loading.value = false;
            localStorage.setItem(USERINFO, JSON.stringify(res.data));
            mu.push({
              path: '/dashboard/list'
            });
          });
        }, (res) => {
          loading.value = false;
        });
      })
      .catch(error => {
        console.log('error', error);
      });
  };

  return {
    form,
    rules,
    validateInfos,
    submit,
    loading
  };
}