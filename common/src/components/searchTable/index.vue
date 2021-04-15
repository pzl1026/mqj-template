<template>
  <div class="search-form-body">
    <a-form ref="formRef" 
    :model="params" 
    v-bind="formItemLayoutWithOutLabel" 
    :rules="rules">
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
            {{collapsed ? '收起' : '展开'}} 
            <UpOutlined v-if="collapsed" />
            <DownOutlined v-else />
          </a>
        </div>
      </a-form-item>
    </a-form>
  </div>
  <a-row :gutter="[16, 16]" style="margin-top: 16px">
    <a-col :span="24">
      <slot name="actions"></slot>
    </a-col>
    <a-col :span="24">
      <a-table 
      :dataSource="dataSource" 
      :columns="columns" 
      v-bind="tableProps" 
      :pagination="false">
        <template v-for="(item,index) in tableActionSlots" :key="item" v-slot:[item]>
          <slot :name="item"></slot>
        </template>
      </a-table>
    </a-col>
    <a-col :span="24" class="table-pagination">
      <a-pagination
        show-size-changer
        show-quick-jumper
        v-model:current="pageParams.current"
        v-model:pageSize="pageParams.pageSize"
        :total="pageParams.total"
        @change="pageChange"
        @showSizeChange="showSizeChange"
      />
    </a-col>
  </a-row>
</template>

<script>
import { defineComponent, reactive, ref, toRaw, toRefs, watch, onMounted } from 'vue';
import { DownOutlined, UpOutlined } from '@ant-design/icons-vue';
import ConfigProvider from 'ant-design-vue/lib/config-provider';

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

const tableSlots = (columns) => {
  let slots = [];
  for (let v of columns) {
    if (v.slots && v.slots.customRender) {
      slots.push(v.slots.customRender);
    }
  }
  return slots;
};

export default defineComponent({
  emits: ['init'],
  components: {
    DownOutlined,
    UpOutlined,
    AConfigProvider: ConfigProvider,
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
    },
    tableProps: {
      type: Object,
      default: {}
    },
    api: {
      type: Function,
      default: () => {}
    },
    columns: {
      type: Array,
      default: []
    },
    handleData: {
      type: [Function, undefined],
      default: undefined
    },
    collapsed: {
      type: Boolean,
      default: false
    },
    // rules，暂时有问题，不作处理
    rules: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      tableActionSlots: tableSlots(this.columns)
    }
  },
  setup (props, context) {
    const {formItems, minCount, api} = props;
    const formRef = ref();

    const dynamicValidateForm = reactive({
      formItems,
    });
    const formState = reactive({
      minCount,
      collapsed: props.collapsed
    });

    const state = reactive({
      dataSource: [],
      params: getParams(props.formItems),
      pageParams: {
        current: 1,
        total: 100,
        pageSize: 10
      }
    });

    const collapseFormItems = () => {
      formState.collapsed = !formState.collapsed;
      if (formState.collapsed) {
        dynamicValidateForm.formItems = formItems;
      } else {
        dynamicValidateForm.formItems = formItems.slice(0, formState.minCount);
      }
    };
    
    const getData = async (params) => {
      const data = await api(params);
      if (data.data.list) {
        state.dataSource = props.handleData ? props.handleData(data.data.list) : data.data.list;
      } else {
        console.error('没有data.list');
      }
    }

    collapseFormItems();

    watch(() => [state.params, state.pageParams], 
    ([newParamsVal, newPageParamsVal], [prevParamsVal, prevPageParamsVal]) => {
      getData(Object.assign({}, toRaw(newParamsVal), toRaw(newPageParamsVal), props.fixParams));
    });

    function load () {
      getData(Object.assign({}, toRaw(state.params), toRaw(state.pageParams), props.fixParams));

    }

    load();

    onMounted(() => {
      context.emit('init', load);
    });

    const submitForm = () => {
      formRef.value
        .validate()
        .then(() => {
          const formatDate = 'YYYY-MM-DD HH:mm:ss';
          const params = Object.assign({}, props.fixParams, getParams(dynamicValidateForm.formItems));
          let rangeItems = formItems.filter(item => item.component.name == 'MRangePicker');
          rangeItems.forEach(item => {
            params[item.valueFields[0]] = params[item.name][0] && params[item.name][0].format(formatDate);
            params[item.valueFields[1]] = params[item.name][1] && params[item.name][1].format(formatDate);
            delete params[item.name];

          });
          state.params = params;
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

    const pageChange = (val) => {
      state.pageParams = {
        ...state.pageParams,
        current: val
      };
    };

    const showSizeChange = (val, size) => {
       state.pageParams = {
        ...state.pageParams,
        pageSize: size
      }
    };

    return {
      formRef,
      formItemLayout,
      formItemLayoutWithOutLabel,
      dynamicValidateForm,
      ...toRefs(formState),
      ...toRefs(state),
      submitForm,
      resetForm,
      collapseFormItems,
      pageChange,
      showSizeChange
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
    border-radius: 3px;
  }
  .table-pagination{
    display: flex;
    justify-content: flex-end;
    .ant-pagination-item-link{
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
</style>