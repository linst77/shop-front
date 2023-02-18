<template>
  <v-app-bar color="white" name="app-bar" flat fixed style="position: fixed">
    <!-- <v-app-bar-nav-icon
          class="d-md-none"
          @click="drawer = !drawer"
        ></v-app-bar-nav-icon> -->
    <v-app-bar-title
      ><span class="font-weight-bold">POLY</span
      ><span class="font-weight-light">GON</span></v-app-bar-title
    >
    <v-spacer></v-spacer>
    <div>
      <v-btn prepend-icon="mdi-logout-variant" @click="delete_storage()"
        >To Store</v-btn
      >
    </div>
  </v-app-bar>
  <v-main>
    <v-img
      src="https://shop-api-storage.s3.ap-northeast-2.amazonaws.com/static/images/temp/store/1/store1_front.jpg"
      cover
      max-height="200"
    ></v-img>
    <router-view></router-view>
  </v-main>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
import { back_to_store } from "@/api/http.js";

export default {
  name: "OrDer",
  data() {
    return {};
  },
  async created() {
      await this.$store.dispatch("profile/init_page")
    },
  methods: {
    ...mapMutations(["set_user_data", "set_language"]),
    ...mapActions(["get_user"]),

    delete_storage() {
      back_to_store();
    },
  },
};
</script>

<style>
</style>