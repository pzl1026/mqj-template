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
            :name="formItem.name"
            class="mqj-form-item-nospan"
          >
           <!-- :name="['formItems', index, paramsType(formItem.component.name)]" -->
            <template v-if="formItem.component == undefined || formItem.component.name == undefined">
              <span style="color: #f00">该项缺少component.name字段</span>
            </template>
            <component :is="formItem.component.name" v-bind="{formItem}" v-else></component>
          </a-form-item>
        </a-col>
      </a-row>
      <a-form-item :wrapperCol="{xs: {span: 4, offset: 20}}" style="margin-bottom: 0">
        <div class="search-submit">
          <a-button type="primary" html-type="submit" @click="submitForm">查询</a-button>
          <a-button style="margin-left: 10px" @click="resetForm">重置</a-button>
          <a :style="{ marginLeft: '8px', fontSize: '12px' }" @click="collapseFormItems">
            {{formItems.length > 3 ? '收起' : '展开'}} 
            <UpOutlined v-if="formItems.length > 3" />
            <DownOutlined v-else />
          </a>
        </div>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { defineComponent, reactive, ref, toRaw, toRefs } from 'vue';
import { DownOutlined, UpOutlined } from '@ant-design/icons-vue';
import allItems from '@/components/formItems';
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
  components: {
    DownOutlined,
    UpOutlined,
    ...allItems
  },
  props: {
    formItems: {
      type: Array,
      default: []
    },
    fixParams: {
      type: Object,
      default: {}
    },
    minCount: {
      type: Number,
      default: 3
    }
  },
  data() {
    return {
      // componentName: 'MInput'
    }
  },
  methods: {
    paramsType(name) {
      switch(name) {
        case 'MRangePicker': 
          return ['value', 'value'];
        case 'MInputNumber': 
          return 'value';
        default : 
            return 'value'
      }
    }
  },
  setup (props) {
    const {formItems, minCount} = props;
    const formRef = ref();

    const dynamicValidateForm = reactive({
      formItems,
    });
    const formState = reactive({
      minCount,
      collapsed: false
    });

    const collapseFormItems = () => {
      formState.collapsed = !formState.collapsed;
      if (formState.collapsed) {
        dynamicValidateForm.formItems = formItems;
      } else {
        dynamicValidateForm.formItems = formItems.slice(0, formState.minCount);
      }
    };

    collapseFormItems();

    const submitForm = () => {
      formRef.value
        .validate()
        .then(() => {
          const formatDate = 'YYYY-MM-DD HH:mm:ss';
          const params = Object.assign({}, props.fixParams, getParams(dynamicValidateForm.formItems));
          let rangeItems = formItems.filter(item => item.component.name == 'MRangePicker');
          rangeItems.forEach(item => {
            params[item.valueFields[0]] = params[item.name][0].format(formatDate);
            params[item.valueFields[1]] = params[item.name][1].format(formatDate);
            delete params[item.name];
          });
        })
        .catch(error => {
          console.warn('error', error);
        });
    };

    const resetForm = () => {
      // formRef.value.resetFields();
      dynamicValidateForm.formItems.forEach(item => {
        if (item.component.name == 'MRangePicker') {
          item.value = [];
        } else {
          item.value = '';
        }
      });
    };

    return {
      formRef,
      formItemLayout,
      formItemLayoutWithOutLabel,
      dynamicValidateForm,
      ...toRefs(formState),
      submitForm,
      resetForm,
      collapseFormItems
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