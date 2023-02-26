<template>
  <div class="text-center ma-0 pa-0">
    <v-dialog v-model="this.tic_window">
      <v-col cols="12">
        <v-card
          color="black"
          class="mx-auto justify-center align-center ma-0 pa-0"
          min-width="100"
          min-height="100"
          :max-width="change()"
          plain
        >
          <v-card-text class="pb-0 mb-0">
            <div>
              <audio style="width:100%;"
                    controls
                    :src="this.content.clicked_image">
            </audio>
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
                icon="mdi-cloud-upload"
                @click="openFileUpload()"
              ></v-btn>
              <v-file-input
                @change="eachChange"
                accept="audio/*"
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
</template>

<script>
import "vue-advanced-cropper/dist/style.css";
import { mapState, mapActions, mapMutations } from "vuex";

export default {
  name: "AudioEditor",
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
  components: {},
  computed: {
    ...mapState(["content", "profile"]),

    tic_window() {
      let result;
      if (this.content.clicked_type == 3 && this.content.status_modal == true) {
        result = 3;
      }
      return result;
    },

    windowResolution_icon() {
      if (this.$vuetify.display.width > 965) return "large";
      else return "small";
    },
  },
  methods: {
    ...mapMutations(["set_user_data", "set_language"]),
    ...mapActions(["get_user"]),
    change() {
      if (this.$vuetify.display.width < 800) {
        return this.$vuetify.display.width - 20;
      }
      return 800;
    },

    openFileUpload() {
      document.getElementById("eachChanges").click();
    },
    async eachChange(e) {
      let flie = e.target.files;
      const dataFile = new FormData();
      dataFile.append("files", flie[0]);
      await this.$store.dispatch("content/put_eachfile", {
        id: this.content.clicked_id,
        data: dataFile,
      });
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
  },
};
</script>

<style>
.cropper_windows {
  display: block;
  max-height: 560px;
}
</style>