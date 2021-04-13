<template>
  <a-select
    v-bind="formItem"
    v-model:value="formItem.value"
    allow-clear 
  />
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  props: ['formItem']
});
</script>