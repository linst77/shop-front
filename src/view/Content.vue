<template>
    <Imageeditor></Imageeditor>
    <Videoeditor></Videoeditor>
    <Audioeditor></Audioeditor>
    <LoadingWin></LoadingWin>
    
    <v-img
      src="https://shop-api-storage.s3.ap-northeast-2.amazonaws.com/static/images/temp/store/1/store1_front.jpg"
      cover
      max-height="200"
    ></v-img>
    <v-divider></v-divider>

    <v-container class="pa-0 ma-0" fluid>
      <v-row class="justify-center pa-0 ma-3">
        <v-divider></v-divider>
        <div class="text-h7 font-italic ma-3">
          - Upload your files and texts with
          {{ this.profile.user_product.items }} steps -
        </div>
        <v-divider></v-divider>
      </v-row>
      <!----------------------------------------------- Tabs -->
      <v-row>
        <v-card class="mx-auto" max-width="1200" flat>
          <v-divider></v-divider>
          <v-sheet elevation="0">
            <v-tabs
              show-arrows
              slider-color="orange"
              color="orange-accent-4"
              center-active
            >
              <v-tab
                v-for="(item, idx) in this.profile.user_product.items"
                size="small"
                :key="idx"
                :value="item.id"
                @click="index_selector(idx)"
                >{{ item }}
              </v-tab>
            </v-tabs>
          </v-sheet>
          <v-divider></v-divider>
        </v-card>
      </v-row>
      <v-row class="justify-center pa-0 ma-0 mt-4">
        <div>
          <Card :index="this.index"></Card>
        </div>
      </v-row>

    </v-container>
</template>
 
<script>
import { mapState, mapActions, mapMutations } from "vuex";
import Card from "@/components/Card.vue";
import Imageeditor from "@/components/ImageEditor.vue";
import Audioeditor from "@/components/AudioEditor.vue";
import Videoeditor from "@/components/VideoEditor.vue";
import LoadingWin from "@/components/Loadingwin.vue";


export default {
  name: "ConTent",
  data() {
    return {
      snackbar: true,
      toggle: undefined,
      file: false,
      div: 1,
      index: 0,

      coordinates: {
        width: 0,
        height: 0,
        left: 0,
        top: 0,
      },
    };
  },
  computed: {
    ...mapState(["content", "profile"]),

    tic_window() {
      let result;
      if (this.content.clicked_type == 3 && this.content.status_modal == true) {result = 3;}
      else if(this.content.clicked_type == 2 && this.content.status_modal == true){result = 2;}
      else if(this.content.clicked_type == 1 && this.content.status_modal == true){result = 1;}
      else{ result = 0}
      return result
    },


    // windowResolution_icon() {
    //   if (this.$vuetify.display.width > 965) return "large";
    //   else return "small";
    // },
  },
  methods: {
    ...mapMutations(["set_user_data", "set_language"]),
    ...mapActions(["get_user"]),

    index_selector(idx) {
      // update sort by selected index
      if (this.profile.user_product.id) {
        this.$store.dispatch("content/sort_save", { index: this.index });
        this.index = idx;
      }
    },

  },
  unmounted() {
    if (this.profile.user_product) {
      this.$store.dispatch("content/sort_save", { index: this.index });
    }
  },
  components: {
    Card,
    Imageeditor,
    Audioeditor,
    LoadingWin,
    Videoeditor,
  },
};
</script>
 
<style>
</style>


























