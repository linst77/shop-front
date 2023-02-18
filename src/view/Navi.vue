<template>
  <v-app id="App">
    <v-layout ref="app">
      <v-app-bar
        color="white"
        name="app-bar"
        flat
        fixed
        style="position: fixed"
      >
        <v-app-bar-nav-icon
          class="d-md-none"
          @click="drawer = !drawer"
        ></v-app-bar-nav-icon>
        <v-app-bar-title
          ><span class="font-weight-bold">POLY</span
          ><span class="font-weight-light">GON</span></v-app-bar-title
        >	&nbsp;	&nbsp;	&nbsp;	&nbsp;
        <div flat v-if="windowResolution == true">
          <div>
            <v-btn
              v-for="(item, index) in items"
              @click="pass_router(item.link)"
              :key="item"
              :prepend-icon="index != 0 ? item.micon : null"
              >{{ item.title }}
            </v-btn>
          </div>
        </div>

        <v-spacer></v-spacer>
        <a>EN</a> 	&nbsp;/ 	&nbsp;<a>EP</a> 	&nbsp;	&nbsp;
        <div>
          <v-btn prepend-icon="mdi-logout-variant" @click="delete_storage()"
            >To Store</v-btn
          >
        </div>
      </v-app-bar>

      <v-navigation-drawer
        location="start"
        color="grey-lighten-0"
        v-model="drawer"
        v-if="!windowResolution == true"
        width="200"
        app-bar
        temporary
        style="position: fixed"
      >
        <v-list nav>
          <v-list-item
            :title="this.profile.user_data.first_name + this.profile.user_data.last_name"
            :subtitle="this.profile.user_data.email"
          ></v-list-item>
          <v-divider></v-divider>

          <v-list-item
            v-for="item in items"
            :key="item.title"
            :title="item.title"
            @click="pass_router(item.link)"
            :prepend-icon="item.icon"
            link
          >
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-main>
        <router-view> </router-view>
      </v-main>
    </v-layout>
    {{  temp00 }}

</v-app>
</template>

<script>
// import router from "@/router/router.js";
import { back_to_store, push_route } from "@/api/http.js";
import { mapState, mapActions, mapMutations } from "vuex";

export default {
  name: "NaVi",
  data: () => ({
    drawer: false,

    temp00 : null,
    items: [
      {
        title: "Order",
        icon: "mdi-check",
        micon: "mdi-circle-small",
        link: "customerorder",
      },
      {
        title: "Profile",
        icon: "mdi-account-check-outline",
        micon: "mdi-circle-small",
        link: "profile",
      },
      {
        title: "Content",
        icon: "mdi-cloud-upload",
        micon: "mdi-circle-small",
        link: "content",
      },
      {
        title: "Review",
        icon: "mdi-movie-check",
        micon: "mdi-circle-small",
        link: "review",
      },
    ],
  }),
  async created() {
    await this.$store.dispatch("profile/init_profile");
  },
  computed: {
    ...mapState(["profile"]),

    windowResolution() {
      if (this.$vuetify.display.width > 965) return true;
      else return false;
    },
  },
  methods: {
    ...mapMutations(["set_user_data", "set_language"]),
    ...mapActions(["get_user"]),

    pass_router(input) {
      push_route(input);
    },

    delete_storage() {
      back_to_store();
    },
  },
};
</script>

<style>
</style>
