<template>
    <a-range-picker 
    v-bind="formItem" 
    format="YYYY-MM-DD HH:mm:ss"
    v-model:value="formItem.value"
    :locale="zhCN" 
    style="width: 370px"
    :show-time="{
      hideDisabledOptions: true,
    }"/>
</template>

<script>
import { defineComponent } from 'vue';
import moment from 'moment';
import 'moment/dist/locale/zh-cn';
import zhCN from 'ant-design-vue/es/date-picker/locale/zh_CN';
moment.locale('zh-cn');

export default defineComponent({
  props: ['formItem'],
  data() {
    return {
      moment,
      zhCN
    }
  },
  created() {

  }
});
</script>

<style lang="scss">
  .ant-calendar-picker-input {
    height: 32px
  }
  .ant-calendar-header{
    .ant-calendar-next-month-btn, .ant-calendar-next-year-btn, 
    .ant-calendar-prev-month-btn, .ant-calendar-prev-year-btn {
      padding-top: 15px;
    }
  }
</style>