<template>
  <v-card elevation="12">
    <v-toolbar
      color="primary"
      dark
      flat
    >
      <v-row justify="center">
        <v-toolbar-title>Введите имя</v-toolbar-title>
      </v-row>
    </v-toolbar>
    <v-card-text>
      <v-form v-on:submit.prevent="submit">
        <v-text-field
          label="Имя"
          name="username"
          prepend-icon="person"
          type="text"
          :rules="[rules.required]"
          ref="username"
          v-model="username"
        ></v-text-field>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-row justify="center">
        <v-btn
          color="error"
          @click="submit"
        >Начать переписываться</v-btn>
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      rules: {
        required: value => !!value || "Необходимо имя"
      }
    };
  },
  computed: {
    username: {
      get() {
        return this.$store.getters["main/username"];
      },
      set(username) {
        return this.$store.commit("main/setUsername", username);
      }
    }
  },
  methods: {
    submit() {
      const isValid = this.$refs["username"].validate(true);
      if (isValid) this.$router.push("/chat");
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
