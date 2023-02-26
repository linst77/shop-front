<template>
  <v-app>
    <main>
      <!-- Final Submit popup window -->
      <v-dialog v-model="submit" class="justify-center" max-width="400" hide-overlay>
        <v-card class="justify-center">
          <v-card-text>
            Your content will be sent to file system for the final. Are you sure
            you want to submit them?
          </v-card-text>
          <v-card-actions class="justify-center">
              <v-btn color="primary" @click="submit = false; final_submit()">yes</v-btn>
              <v-btn color="error" @click="submit = false" >No</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- MODAL: Guide Video-->
      <v-dialog v-model="overlay">
        <v-card color="transparent" flat elevation="0">
          <div style="text-align: center">
            <v-icon
              style="margin-bottom: 8px"
              color="white"
              size="x-large"
              @click="overlay = false"
              >mdi-window-close</v-icon
            >
          </div>
          <iframe class="card_iframe" :src="guide_ct"></iframe>
        </v-card>
      </v-dialog>
      <!-- MODAL -->

      <v-card
        class="d-flex text-caption text-grey justify-end mt-3 mb-2 px-1"
        color="transparent"
        flat
      >
        <div class="d-flex justify-center align-center px-1">
          <v-icon>mdi-crop</v-icon>
          <p>Crop</p>
        </div>
        <div class="d-flex justify-center align-center px-1">
          <v-icon>mdi-format-text-variant-outline</v-icon>
          <p>Subtitle</p>
        </div>
        <div class="d-flex justify-center align-center px-1">
          <v-icon>mdi-cloud-upload</v-icon>
          <p>Upload</p>
        </div>
        <div class="d-flex justify-center align-center px-1">
          <v-icon>mdi-mouse-move-vertical</v-icon>
          <p>Move Order</p>
        </div>
      </v-card>
      <v-container class="ma-0 pa-2 card-container">
        <v-row>
          <v-col cols="12">
            <div class="card-head">
              <v-card
                class="d-flex text-caption text-white justify-start"
                color="transparent"
                flat
                mx-width="800"
              >
                <span>
                  <a class="text-body-1"
                    >&nbsp;&nbsp; {{ description_ct }} {{ img_ct }} picture
                    needed</a
                  ></span
                >
                
              </v-card>

              <v-file-input
                id="fileUpload"
                style="display: none"
                accept="image/*"
                @change="photo_upload($event, index)"
                multiple
              />
            </div>
            <div>
            <draggable
              class="d-flex card-drg px-1"
              v-model="this.content.file_data[index]"
              animation="100"
              :sort="true"
              item-key="id"
              @change="photo_dragging(this.content.file_data[index], index)"
              :disabled="this.disabled_input"
            >
              <template #item="{ element }">
                <div class="card-card">
                  <img
                    class="card-img"
                    :src="element.thumbnail"
                    @click="image_click(element)"
                    :class="
                      element.id === this.content.clicked_id
                        ? 'card-active'
                        : 'card-deactive'
                    "
                  />
                  <v-card
                    class="
                      card-card-overlay1
                      d-flex
                      text-red
                      justify-space-around
                      align-center
                      pl-6
                    "
                    color="transparent"
                    flat
                  >
                    <div>
                      <p class="card-text">{{ element.orders + 1 }}</p>
                    </div>
                  </v-card>
                  <div class="card-card-overlay">
                    <div v-if="this.disabled_input != true">
                      <v-icon v-if="element.file_type == 1"
                        size="small"
                        color="white"
                        @click="
                          imageEdit(
                            element,
                            index,
                            element.orders,
                            this.text_show_input_box[index],
                            content.content_user_data.sub_title
                          )
                        "
                      >
                        mdi-crop
                      </v-icon>
                      <v-icon v-if="element.file_type == 2"
                        size="small"
                        color="white"
                        @click="
                          imageEdit(
                            element,
                            index,
                            element.orders,
                            this.text_show_input_box[index],
                            content.content_user_data.sub_title
                          )
                        "
                      >
                      mdi-movie-open-outline
                      </v-icon>
                      <v-icon v-if="element.file_type == 3"
                        size="small"
                        color="white"
                        @click="
                          imageEdit(
                            element,
                            index,
                            element.orders,
                            this.text_show_input_box[index],
                            content.content_user_data.sub_title
                          )
                        "
                      >
                      mdi-music
                      </v-icon>


                      <v-icon
                        size="small"
                        color="red"
                        @click="
                          imageEdit(
                            element,
                            index,
                            element.orders,
                            this.text_show_input_box[index],
                            content.content_user_data.sub_title
                          )
                        "
                        v-show="
                          text_subtitle_show(
                            element.orders,
                            this.text_show_input_box[index]
                          )
                        "
                      >
                        mdi-format-text-variant-outline
                      </v-icon>
                    </div>
                  </div>
                </div>
              </template>
            </draggable>
          </div>
          </v-col>
        </v-row>
        <div class="pa-3">
          <v-card
            class="d-flex text-caption text-white justify-center"
            flat
            color="transparent"
          >
            <v-btn
              :disabled = "this.disabled_input"
              size="small"
              prepend-icon="mdi-cloud-upload"
              variant="outlined"
              @click="fileUploadBtn()"
              >UPLOADS</v-btn
            >
            <v-spacer></v-spacer>
            <div>
              <v-btn
                size="small"
                append-icon="mdi-play"
                variant="outlined"
                @click="overlay = true"
                >Guide Movie</v-btn
              >
            </div>
          </v-card>
        </div>
      </v-container>
      <v-container class="ma-0 pa-2 card-container-2">
        <v-card class="justify-center align-center mt-5" flat>
          <div>
            <v-alert
              type="info"
              title="Caution"
              text="Please check your content again. Once you have submitted your content, it is hard to change any thing."
              variant="tonal"
            ></v-alert>
          </div>
          <v-btn
            style="width: 100%"
            height="50"
            prepend-icon="mdi-send"
            color="blue"
            class="mt-8"
            @click="submit_content()"
            :disabled="this.disabled_input"
            >Submit your content</v-btn
          >
        </v-card>
      </v-container>
    </main>
  </v-app>
</template>

<script>
import draggable from "vuedraggable";
import { mapState, mapActions, mapMutations } from "vuex";
import {
  subtitle_showwindow,
  subtitle_readcontext,
} from "@/assets/subtitle.js";
import { push_route } from '@/api/http';

export default {
  name: "CaRd",
  props: {
    index: Number,
  },
  data() {
    return {
      submit: false,
      overlay: false,
      show: true,
    };
  },
  computed: {
    ...mapState(["user", "content", "profile"]),

    text_show_input_box() {
      let bbb = JSON.parse(this.profile.user_product.input_box);
      return bbb;
    },
    mobile_detact() {
      return this.$vuetify.display.mobile;
    },
    img_ct() {
      let tt = this.profile.user_product.counts || "true";
      let con_json = JSON.parse(tt);
      return con_json[this.index];
    },
    description_ct() {
      let tt = this.profile.user_product.description_index || "true";
      let con_json = JSON.parse(tt);
      return con_json[this.index];
    },
    guide_ct() {
      let tt = this.profile.user_product.parts || "true";
      let con_json = JSON.parse(tt);
      return con_json[this.index];
    },
    disabled_input(){
      if (this.profile.user_order.status >= 3){
        return true
      }
      else{ 
        return false
      }
    }

  },
  components: {
    draggable,
  },
  methods: {
    ...mapMutations(["set_user_status"]),
    ...mapActions(["user_verify"]),
    //-------------------- upload multiple files

    fileUploadBtn() {
      document.getElementById("fileUpload").click();
    },
    image_click(element) {
      this.$store.commit("content/set_clicked_image", element.files);
      this.$store.commit("content/set_clicked_type", element.file_type);
      this.$store.commit("content/set_clicked_id", element.id);
    },
    text_subtitle_show(index, listshow) {
      return subtitle_showwindow(index, listshow);
    },

    text_subtitle_readcontext(index, orders, list) {
      return subtitle_readcontext(index, orders, list);
    },
    text_searchChangeFunc(event, index, orders) {
      this.content.content_user_data.sub_title[index].text_array[orders].text =
        event.target.value;
    },
    photo_upload(event, index) {
      let index_file = event.target.files;
      let count_for = index_file.length;

      if (index_file.length > this.img_ct) {
        count_for = this.img_ct;
      }

      let count_img = 0
      for (var i = 0; i < count_for; i++) {
        let each = this.content.file_data[index][i]
        if ( i >= this.img_ct){
          break
        }
        else if (each.file_type == 1){
          each.thumbnail = "https://linst-s3.s3.ap-northeast-2.amazonaws.com/static/images/temp/uploding_anim.gif";
          const dataFile = new FormData();
          const file_id = this.content.file_data[index][i].id;
          dataFile.append("files", index_file[count_img]);
          count_img += 1
          dataFile.append("id", file_id);
          this.$store.dispatch("content/put_files", {
            id: file_id,
            data: dataFile,
            index: index,
            });
        }
        else{
          count_for += 1;
        }
      }
    },
    photo_dragging(count, index) {
      for (var i = 0; i < count.length; i++) {
        this.content.file_data[index][i].orders = i;
        this.content.file_data[index][i].index = i;
      }
    },

    imageEdit(element, index, orders, list, content) {
      this.$store.commit("content/set_clicked_image", element.files);
      this.$store.commit("content/set_clicked_id", element.id);
      this.$store.commit("content/set_clicked_type", element.file_type)
      this.$store.commit("content/set_status_modal", true);
      console.log( this.content.status_modal)

      // text input box show or not
      let input_box = this.text_subtitle_show(orders, list);
      if (input_box === true) {
        this.$store.commit("content/set_status_text_input", true);
      } else {
        this.$store.commit("content/set_status_text_input", false);
      }
      let text_input = this.text_subtitle_readcontext(index, orders, content);
      this.$store.commit("content/set_text_input", text_input);
      this.$store.commit("content/set_text_index", index);
      this.$store.commit("content/set_text_order", orders);
    },
    submit_content() {
      this.submit = true;
    },
    final_submit(){
      this.$store.dispatch("content/final_submit", {"id" : this.profile.user_order.id})
      push_route('review')
    }
  },
};
</script>

<style>
.card-container {
  background-color: #ff9100;
  border-radius: 12px;
  max-width: 910px;
}
.card-container-2 {
  border-radius: 12px;
  max-width: 910px;
}

.card-drg {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  margin: 0px 0px 0px 0px;
  padding: 0px;
  justify-content: start;
}
.card-card {
  position: relative;
  width: 110px;
  height: 62px;
}
.card-card-overlay {
  position: absolute;
  top: 0;
  left: 0;
}
.card-card-overlay1 {
  pointer-events: none;
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  margin: 0px;
  padding: 0px;
}
.card-text {
  color: rgba(255, 255, 255, 0.5);
  font-size: 35px;
  font-weight: bold;
}

.card-deactive {
  padding: 0px;
  margin: 0px;
  width: 100%;
  height: 100%;
  filter: grayscale(30%) brightness(50%);
}
.card-active {
  padding: 0px;
  width: 100%;
  height: 100%;
  filter: grayscale(0%);
  box-shadow: 0 0 10px #07c;
  outline: 2px solid rgb(0, 138, 236);
  outline-offset: -1px;
}
.card-img {
  padding: 0px;
  margin: 0px;
  width: 110px;
  height: 62px;
}
.card-img:hover {
  width: 110px;
  height: 62px;
  filter: grayscale(0%);
  box-shadow: 0 0 10px #07c;
  outline: 2px solid rgb(0, 138, 236);
  outline-offset: -1px;
}
.card-head {
  display: flex;
  padding: 2px;
  padding-bottom: 5px;
  color: white;
  background-color: transparent;
  justify-content: space-between;
}
.card_iframe {
  position: relative;
  display: block;
  border: none;
  height: 40vh;
  width: 100%;
}
.disable_click{
  pointer-events: none;
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  margin: 0px;
  padding: 0px;
}
</style>