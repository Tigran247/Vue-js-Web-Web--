<template>
  <v-app>
    <v-navigation-drawer
      :value="sidebar"
      app
      mobile-breakpoint="600"
    >
      <new-room></new-room>
      <v-divider></v-divider>
      <room-list></room-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      color="blue darken-2"
      dark
    >
      <v-row justify="center">
        <v-toolbar-items>
          <v-btn
            text
            to="/"
            large
          >Выйти</v-btn>
          <v-btn
            text
            to="/chat"
            large
          >Чаты</v-btn>
          <v-btn
            text
            to="/about"
            large
          >О проекте</v-btn>
        </v-toolbar-items>
      </v-row>
    </v-app-bar>

    <v-main>
      <v-container
        fluid
        fill-height
      >
        <v-layout
          align-top
          justify-center
          mt-12
        >
          <nuxt />
        </v-layout>
      </v-container>
    </v-main>
    <v-footer
      color="blue darken-2"
      app
    >
      <span class="white--text">&copy; 2022 
        гр. 0375</span>
    </v-footer>
  </v-app>
</template>

<script>
import NewRoom from "@/components/room/NewRoom.vue";
import RoomList from "@/components/room/RoomList.vue";
export default {
  components: {
    NewRoom,
    RoomList
  },
  computed: {
    sidebar() {
      return this.$store.getters["main/sidebar"];
    }
  }
};
</script>

<style>
</style>
