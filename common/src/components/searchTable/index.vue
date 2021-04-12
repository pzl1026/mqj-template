<template>
  <div class="search-form-body">
    <a-form ref="formRef" :model="dynamicValidateForm" v-bind="formItemLayoutWithOutLabel">
      <a-row :gutter="24">
        <a-col
          v-for="(formItem, index) in dynamicValidateForm.formItems"
          :key="formItem.name"
          :span="formItem.span || 8"
        >
          <a-form-item
            v-bind="{
              ...formItemLayout,
              ...formItem,
            }"
            :name="['formItems', index, 'value']"
            class="mqj-form-item-nospan"
          >
            <a-input
              v-model:value="formItem.value"
              placeholder="please input domain"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-form-item :wrapperCol="{xs: {span: 4, offset: 20}}">
        <div class="search-submit">
          <a-button type="primary" html-type="submit" @click="submitForm">查询</a-button>
          <a-button style="margin-left: 10px" @click="resetForm">重置</a-button>
        </div>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import {defineComponent, reactive, ref, toRaw} from 'vue';
const formItemLayout = {
  wrapperCol: {
    xs: {
      span: 16,
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
      minCount: 3
    });

    const collapseFormItems = () => {
      dynamicValidateForm.formItems = props.formItems.splice(0, dynamicValidateForm.minCount);
    };

    collapseFormItems();

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

<style lang="scss">
  .search-submit{
    display: flex;
    justify-content: flex-end;
  }
  .mqj-form-item-nospan .ant-form-item-label {
    width: 140px;
    margin-right: 5px;
  }
  .search-form-body{
    padding: 24px;
    background: #fbfbfb;
    border: 1px solid #d9d9d9;
    border-radius: 6px;
  }
</style>