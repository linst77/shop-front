<template>
  <v-img
    src="https://shop-api-storage.s3.ap-northeast-2.amazonaws.com/static/images/temp/store/1/store1_front.jpg"
    cover
    max-height="200"
  ></v-img>
  <v-container>
    <v-row class="justify-center pa-0 ma-1">
      <v-card max-width="900px" class="pa-0" flat>
        <PreviewIn 
        :step="this.preview_show"></PreviewIn>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import PreviewIn from "@/components/PreviewIn.vue";
export default {
  name: "ReView",
  computed: {
    ...mapState(["profile"]),

    preview_show() {
      if (this.profile.user_order.status <= 2) {
        return 2;
      } else {
        return this.profile.user_order.status;
      }
    },
  },
  components: {
    PreviewIn,
  },
  methods: {
    ...mapMutations(["set_user_data", "set_language"]),
    ...mapActions(["get_user"]),

    testRun() {
      console.log("Download Works");
    },
  },
};
</script>

<style>
</style>