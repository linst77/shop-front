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
import { mapState, mapActions, mapMutations } from "vuex";
//import { del_local_storage, get_local_storage, push_route, back_to_store } from "@/api/http.js"
import { back_to_store } from "@/api/http.js";

// import router from '@/router/router.js'

export default {
  name: "OrDer",
  data() {
    return {};
  },
  async created() {
      console.log("---------------------")
      await this.$store.dispatch("profile/init_page")
    },

    // if ( this.profile.user_data == null){
    //   const user = ( get_local_storage())
    //   if (user.email != null){
    //     this.$store.commit('profile/set_language', user.language)
    //     this.$store.dispatch("profile/get_user", user.email)
    //   }
    //   else{
    //     del_local_storage()
    //     push_route('notfound')
    //   }
    // }
  computed: {
    ...mapState(["profile"]),
    shopify_url() {
      return this.profile.shop;
    },
  },
  methods: {
    ...mapMutations(["set_user_data", "set_language"]),
    ...mapActions(["get_user"]),

    delete_storage() {
      back_to_store();
    },
    //        ...mapMutations(["set_user_data", "set_language"]),
    //       ...mapActions(["get_user"]),
  },
};
</script>

<style>
</style>