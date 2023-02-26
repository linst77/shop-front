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
            <div class="mb-3">
              <span>{{ this.file_name }}</span>
            </div>
            <div>
              <video  style="width:100%; max-height: 500px;"
                    controls
                    autoplay
                    :src="this.content.clicked_image">
            </video >
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
                accept="video/mp4"
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
import { mapState, mapActions, mapMutations } from "vuex";

export default {
  name: "VideoEditor",
  data() {
    return {
      snackbar: true,
      toggle: undefined,
      file: false,
      div: 1,
      index: 0,
    };
  },
  components: {},
  computed: {
    ...mapState(["content", "profile"]),
    tic_window() {
      let result;
      if (this.content.clicked_type == 2 && this.content.status_modal == true) {
        result = true;
      }
      return result;
    },
    windowResolution_icon() {
      if (this.$vuetify.display.width > 965) return "large";
      else return "small";
    },
    file_name(){
      let index = this.content.clicked_image.lastIndexOf('.');
      let extension = null;
      if (index > 0) {
        let audio_ext = ["mp4"]
        extension = this.content.clicked_image.substring(index + 1);
        if ( audio_ext.includes( extension)){
          let temp = this.content.clicked_image.lastIndexOf('/')
          extension = this.content.clicked_image.substring(temp+1)
        }
        else{
          extension = "No Video File(mp4) Added Yet"
        }
      }
      else{
        extension = "No Video File(mp4) Added Yet"
      }
      return extension
    }
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
  },
};
</script>

<style>
.video_windows{
  max-height: 300px;
}

</style>