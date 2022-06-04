<template>
  <div>
    Vue-js Web – чат на Web-сокетах.
  </div>
</template>

<script>
export default {
  fetch({ store }) {
    store.commit("main/showSidebar", false);
  },
  layout: "chat"
};
</script>

<style lang="scss" scoped>
</style>
