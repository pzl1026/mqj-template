<template>
  <div>
    <span @click="toLink">toHello</span>
  </div>
</template>

<script>
export default {
  methods: {
    toLink() {
      this.$router.push({
        path: '/list',
      });
    }
  }
}
</script>