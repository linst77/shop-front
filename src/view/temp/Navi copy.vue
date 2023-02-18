<template>
    <div>test</div>
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
        >

        <div flat v-if="windowResolution == true">
          <v-btn
            v-for="(item, index) in items"
            :key="item"
            :prepend-icon="index != 0 ? item.micon : null"
            :to="item.link"
            >{{ item.title }}
          </v-btn>
        </div>
        <v-spacer></v-spacer>

        <div>
          <v-btn prepend-icon="mdi-logout-variant" @click="signout_fn()">Signout</v-btn>
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
      >
        <v-list nav>
          <v-list-item
            title="Sandra Adams"
            subtitle="sandra_a88@gmailcom"
          ></v-list-item>
          <v-divider></v-divider>

          <v-list-item
            v-for="item in items"
            :key="item.title"
            :title="item.title"
            :prepend-icon="item.icon"
            :to="item.link"
            link
          >
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-main>
        <!-- <router-view> </router-view> -->
      </v-main>
    </v-layout>
</v-app>
</template>

<script>

export default {
    name: "NaVi",
    data: () => ({
    drawer: false,
    items: [
      // { title: "Login", icon: "mdi-login-variant", micon: "mdi-circle-small", link:{ name: 'login' }},
      { title: "Sample", icon: "mdi-check", micon: "mdi-circle-small", link:{ name: 'samples' }},
      { title: "Profile", icon: "mdi-account-check-outline", micon: "mdi-circle-small", link:{ name: 'profile' }},
      { title: "Content", icon: "mdi-cloud-upload", micon: "mdi-circle-small", link:{ name: 'content' }},
      { title: "Review", icon: "mdi-movie-check", micon: "mdi-circle-small", link:{ name: 'review' }}
    ],
  }),
}
</script>

<style>

</style>