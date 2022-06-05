<template>
  <v-list>
    <v-subheader>Новые чаты</v-subheader>
    <v-list-item-content>
      <form @submit.prevent="addRoom">
        <v-text-field
          label="Название чата"
          name="roomname"
          type="text"
          :rules="[rules.required]"
          ref="roomname"
          v-model="roomname"
        ></v-text-field>
      </form>
      <v-btn
        color="success"
        @click="addRoom"
      >
        <v-icon>add</v-icon>
        Добавить
      </v-btn>

    </v-list-item-content>
  </v-list>
</template>

<script>
export default {
  data() {
    return {
      roomname: "",
      rules: {
        required: value => !!value || "Требуется название чата"
      }
    };
  },
  methods: {
    addRoom() {
      const isValid = this.$refs["roomname"].validate(true);
      if (isValid) {
        this.$store.dispatch("main/addRoom", this.roomname);
        this.$refs["roomname"].reset();
      }
    },
    roomKey(roomName) {
      return roomName
        .trim()
        .toLowerCase()
        .replace(/\s/g, "-");
    }
  }
};
</script>

<style scoped>
.v-list {
  background-color: #fdfdfd;
}
</style>