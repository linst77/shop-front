<template>
    <!-------------------------------------- Mocal Windows ---------------------------------->
    <div class="text-center ma-0 pa-0">
      <v-dialog v-model="this.content.status_modal">
        <v-col cols="12">
          <v-card
            color="black"
            class="mx-auto justify-center align-center ma-0 pa-0"
            min-width="100"
            min-height="200"
            :max-width="change()"
            plain
          >
            <v-card-text class="pb-0 mb-0">
              <div>
                <Cropper
                  :src="this.content.clicked_image"
                  ref="cropper"
                  :stencil-props="{ aspectRatio: 16 / 9 }"
                  @change="onChange"
                  class="cropper_windows"
                  :canvas="false"
                  :check-orientation="false"
                  imageRestriction="none"
                />
              </div>
              <v-text-field
                class="px-0"
                :autofocus="true"
                bg-color="white"
                color="priamry"
                v-show="this.content.text_input_modal"
                name="input-7-4"
                label="write your text for the image"
                v-model="this.content.text_content"
                @input="
                  text_searchChangeFunc(
                    $event,
                    this.content.text_index,
                    this.content.text_order
                  )
                "
              ></v-text-field>
            </v-card-text>
            <v-card-actions class="d-flex justify-space-between pt-0 mt-0">
              <div>
                <v-btn
                  :size="this.windowResolution_icon"
                  class="pa-0 ma-0"
                  color="white"
                  icon="mdi-magnify-plus-outline"
                  @click="zoom(1.25)"
                ></v-btn>
                <v-btn
                  :size="this.windowResolution_icon"
                  class="pa-0 ma-0"
                  color="white"
                  icon="mdi-magnify-minus-outline"
                  @click="zoom(0.8)"
                ></v-btn>
                <v-btn
                  :size="this.windowResolution_icon"
                  class="pa-0 ma-0"
                  color="white"
                  icon="mdi-restore"
                  @click="rotate_angle(-5)"
                ></v-btn>
                <v-btn
                  :size="this.windowResolution_icon"
                  class="pa-0 ma-0"
                  color="white"
                  icon="mdi-reload"
                  @click="rotate_angle(5)"
                ></v-btn>
                <v-btn
                  :size="this.windowResolution_icon"
                  class="pa-0 ma-0"
                  color="white"
                  icon="mdi-crop"
                  @click="crop"
                ></v-btn>
                <v-btn
                  :size="this.windowResolution_icon"
                  class="pa-0 ma-0"
                  color="white"
                  icon="mdi-cloud-upload"
                  @click="openFileUpload()"
                ></v-btn>
                <v-file-input
                  @change="eachChange"
                  accept="image/*"
                  id="eachChanges"
                  style="display: none"
                />
              </div>
              <div>
                  <v-btn 
                  :size="this.windowResolution_icon"
                  class="pa-0 ma-0"
                  color="white"
                  icon="mdi-check"
                  @click="edit_done"
                  ></v-btn>
              </div>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-dialog>
    </div>
    <!-------------------------------------- Mocal Windows ---------------------------------->

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
import { Cropper } from "vue-advanced-cropper";
import "vue-advanced-cropper/dist/style.css";
import Card from "@/components/Card.vue";

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

    windowResolution_icon() {
      if (this.$vuetify.display.width > 965) return "large";
      else return "small";
    },
  },
  methods: {
    ...mapMutations(["set_user_data", "set_language"]),
    ...mapActions(["get_user"]),

    ///// --------------------------- cropper ------------------
    // Open File Change

    // When Image Click
    change() {
      if (this.$vuetify.display.width < 800) {
        return this.$vuetify.display.width - 20;
      }
      return 800;
    },

    // When Image File Change

    // --------------------------------------------------- When Image Crop
    //-- Cropper windows file changes
    onChange({ coordinates, image }) {
      this.coordinates = coordinates;
      this.$store.commit("content/set_rotation", image.transforms.rotate);
    },

    openFileUpload() {
      document.getElementById("eachChanges").click();
    },
    async eachChange(e) {
      this.$store.commit(
        "content/set_clicked_image",
        "https://linst-s3.s3.ap-northeast-2.amazonaws.com/static/images/temp/each_upload.gif"
      );
      let flie = e.target.files;
      const dataFile = new FormData();
      dataFile.append("files", flie[0]);
      await this.$store.dispatch("content/put_eachfile", {
        id: this.content.clicked_id,
        data: dataFile,
      });
    },
    crop() {
      const temp_image =
        "https://linst-s3.s3.ap-northeast-2.amazonaws.com/static/images/temp/each_upload.gif";
      this.$store.commit("content/set_clicked_image", temp_image);
      this.$store.dispatch("content/crop_files", {
        id: this.content.clicked_id,
        angle: this.content.rotation,
        data: this.coordinates,
      });
    },
    zoom( input) {
      this.$refs.cropper.zoom( input);
    },
    rotate_angle( input) {
      this.$refs.cropper.rotate( input);
    },
    edit_done() {
      this.$store.commit("content/set_status_modal", false);

      if (this.profile.user_product.id) {
        this.$store.dispatch("content/patch_context");
      }
    },
    // ---------------------------------------------------cropper
    text_searchChangeFunc(event, index, order) {
      this.content.content_user_data.sub_title[index].text_array[order].text =
        event.target.value;
    },
    // Sort patch
    index_selector(idx) {
      // update sort by selected index
      if (this.profile.user_product.id) {
        this.$store.dispatch("content/sort_save", { index: this.index });
        this.index = idx;
      }
    },

    imageEdit(element, index, order, list, content) {
      // console.log(element.files);
      // console.log(element.id);
      this.$store.commit("content/set_status_modal", true);
      this.$store.commit("content/set_clicked_image", element.files);
      this.$store.commit("content/set_clicked_id", element.id);
      // text input box show or not
      let input_box = this.text_subtitle_show(order, list);

      if (input_box === true) {
        this.$store.commit("content/set_status_text_input", true);
      } else {
        this.$store.commit("content/set_status_text_input", false);
      }

      let text_input = this.text_subtitle_readcontext(index, order, content);
      this.$store.commit("content/set_text_input", text_input);
      this.$store.commit("content/set_text_index", index);
      this.$store.commit("content/set_text_order", order);
    },
  },
  unmounted() {
    if (this.profile.user_product) {
      this.$store.dispatch("content/sort_save", { index: this.index });
    }
  },
  components: {
    Card,
    Cropper,
  },
};
</script>
 
<style>
.cropper_windows {
  display: block;
  max-height: 560px;
  /* width:100% */
}
</style>