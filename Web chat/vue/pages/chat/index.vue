<template>
  <v-flex
    xs12
    sm5
    text-center
  >
    <p>Привет, <b>{{ username }}</b>! Выбери комнату или добавь новый для переписки.</p>
  </v-flex>

</template>

<script>
export default {

  fetch({ store }) {
    store.commit("main/showSidebar", true);
    store.dispatch("websocket/connect");
  },
  layout: "chat",
  computed: {
    username() {
      return this.$store.getters["main/username"];
    }
  }
};
</script>

<style scoped>
</style>
