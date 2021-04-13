<template>
  <a-input-number v-model:value="formItem.value" v-bind="formItem" />
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  props: ['formItem']
});
</script>