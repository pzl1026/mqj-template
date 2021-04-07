<template>
  <div>
    <Horizontal v-if="isHorizontal"/>
    <Vertical v-else />
  </div>
</template>

<script>
import Horizontal from './horizontal';
import Vertical from './vertical';
export default {
  components: {
    Horizontal,
    Vertical
  },
  data(){
    return {
      isHorizontal: false
    };
  }
}
</script>