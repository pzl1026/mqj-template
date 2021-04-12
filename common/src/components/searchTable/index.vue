<template>
  <a-form ref="formRef" :model="dynamicValidateForm" v-bind="formItemLayoutWithOutLabel">
    <a-row :gutter="24">
      <a-col
        v-for="i in 10"
        :key="i"
        :span="8"
      >
        <a-form-item
          v-for="(formItem, index) in dynamicValidateForm.formItems"
          :key="formItem.name"
          v-bind="{
            ...formItemLayout,
            ...formItem,
          }"
          :name="['formItems', index, 'value']"
        >
          <a-input
            v-model:value="formItem.value"
            placeholder="please input domain"
            style="width: 60%; margin-right: 8px"
          />
        </a-form-item>
      </a-col>
    </a-row>
    <a-form-item v-bind="formItemLayoutWithOutLabel">
      <a-button type="primary" html-type="submit" @click="submitForm">Submit</a-button>
      <a-button style="margin-left: 10px" @click="resetForm">Reset</a-button>
    </a-form-item>
  </a-form>
</template>

<script>
import {defineComponent, reactive, ref, toRaw} from 'vue';
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 4,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 20,
    },
  },
};
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 20,
      offset: 4,
    },
  },
};

const getParams = (values) => {
  let params = {};
  toRaw(values).forEach(item => {
    params[item.name] = item.value;
  });
  return params;
};

export default defineComponent({
  props: {
    formItems: {
      type: Array,
      default: []
    },
    fixParams: {
      type: Object,
      default: {}
    }
  },
  setup (props) {
    const formRef = ref();

    const dynamicValidateForm = reactive({
      formItems: props.formItems,
    });

    const submitForm = () => {
      formRef.value
        .validate()
        .then(() => {
          console.log('values', dynamicValidateForm.formItems);
          const params = Object.assign({}, props.fixParams, getParams(dynamicValidateForm.formItems));
          console.log(params, 'parass');
        })
        .catch(error => {
          console.warning('error', error);
        });
    };

    const resetForm = () => {
      formRef.value.resetFields();
    };

    return {
      formRef,
      formItemLayout,
      formItemLayoutWithOutLabel,
      dynamicValidateForm,
      submitForm,
      resetForm,
    };
  }
});
</script>