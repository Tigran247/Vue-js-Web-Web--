<template>
  <v-flex
    xs12
    sm3
    text-center
  >
    Добро пожаловать в <strong>{{ roomName }}</strong>
    <v-flex mt-5>
      <v-btn
        color="warning"
        @click="subscribe"
      >Начать переписку</v-btn>
    </v-flex>
  </v-flex>
</template>

<script>
export default {
  props: {
    roomKey: {
      type: String,
      default: ""
    }
  },
  computed: {
    roomName() {
      return this.$store.getters["main/roomName"](this.roomKey);
    }
  },
  methods: {
    subscribe() {
      this.$store.dispatch("main/subscribeRoomUserList", this.roomKey);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>