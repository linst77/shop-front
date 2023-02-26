<template>
  <!-- Submit popup window -->
  <v-dialog
    v-model="submit"
    class="justify-center"
    max-width="400"
    hide-overlay
  >
    <v-card class="justify-center">
      <v-card-text>
        Your content will be sent to file system for the final. Are you sure you
        want to submit them?
      </v-card-text>
      <v-card-actions class="justify-center">
        <v-btn
          color="primary"
          @click="
            submit = false;
            submitForm();
          "
          >yes</v-btn
        >
        <v-btn color="error" @click="submit = false">No</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <!-- Submit popup window -->

  <v-img
    src="https://shop-api-storage.s3.ap-northeast-2.amazonaws.com/static/images/temp/store/1/store1_front.jpg"
    cover
    max-height="200"
  ></v-img>

  <v-divider></v-divider>
  <v-container class="pa-0 ma-0" fluid>
    <v-row class="justify-center pa-0 ma-3">
      <v-divider></v-divider>
      <div class="text-h7 font-italic ma-3">- Registration -</div>
      <v-divider></v-divider>
    </v-row>
    <v-row class="justify-center ma-0 pa-0">
      <!-- Input Info -->
      <v-col>
        <v-card class="mx-auto ma-0 pa-0" max-width="800" flat>
          <v-toolbar color="orange" class="px-5">
            <v-icon icon="mdi-account"></v-icon>
            <v-toolbar-title>Hero/Heroin Information</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-icon icon="mdi-pencil"></v-icon>
          </v-toolbar>
          <v-form class="ma-5" id="myForm" @submit.prevent="submitForm()">
            <v-text-field
              v-model="this.profile.user_product.product_title"
              label="Selected Product"
              density="compact"
              variant="underlined"
              color="primary"
              disabled
            ></v-text-field>
            <v-text-field
              v-model="this.profile.user_data.email"
              label="Contact Email"
              density="compact"
              variant="underlined"
              color="primary"
              :disabled=this.disabled_input              
            ></v-text-field>
            <v-text-field
              :rules="numberRule"
              v-model="this.profile.user_profile.phone"
              label="Contact Phone"
              density="compact"
              variant="underlined"
              color="primary"
              :disabled=this.disabled_input              
            ></v-text-field>
            <v-text-field
              :rules="user_nm_rule"
              v-model="this.profile.user_profile.name_a"
              label="Name 1"
              density="compact"
              variant="underlined"
              color="primary"
              :disabled=this.disabled_input              
            ></v-text-field>
            <v-text-field
              :rules="user_nm_rule"
              v-model="this.profile.user_profile.name_b"
              label="name_a"
              density="compact"
              variant="underlined"
              color="primary"
              :disabled=this.disabled_input              
            ></v-text-field>
            <v-text-field
              :rules="user_nm_rule"
              v-model="this.profile.user_profile.name_c"
              label="name_b"
              density="compact"
              variant="underlined"
              color="primary"
              :disabled=this.disabled_input              
            ></v-text-field>
            <v-text-field
              :rules="user_nm_rule"
              v-model="this.profile.user_profile.name_d"
              label="name_c"
              density="compact"
              variant="underlined"
              color="primary"
              :disabled=this.disabled_input              
            ></v-text-field>
            <v-text-field
              v-model="this.profile.user_profile.location"
              label="address"
              density="compact"
              variant="underlined"
              color="primary"
              :disabled=this.disabled_input              
            ></v-text-field>
            <div class="profile_calendar_div">
              <v-menu
                v-model="dateShow"
                :close-on-content-click="false"
                rounded
                location="top center"
              >
                <template v-slot:activator="{ props }">
                  <v-text-field
                    v-model="this.profile.user_profile.event_date"
                    label="today"
                    density="compact"
                    variant="underlined"
                    color="indigo"
                    v-bind="props"
                    :disabled=this.disabled_input              
                  >
                  </v-text-field>
                </template>
                <v-card min-width="200" max-width="290">
                  <v-list style="text-align: center">
                    <v-list-item>
                      <div>
                        <DatePicker
                          v-model="this.profile.user_profile.event_date"
                          mode="dateTime"
                          :model-config="modelConfig"
                        ></DatePicker>
                      </div>
                      <div>
                        <v-btn
                          class="ma-2"
                          color="orange"
                          size="small"
                          @click="dateShow = false"
                          flat
                          >confirm</v-btn
                        >
                      </div>
                    </v-list-item>
                  </v-list>
                </v-card>
              </v-menu>
            </div>
            <v-textarea
              v-model="this.profile.user_profile.extra_info"
              label="extra_info"
              density="compact"
              variant="underlined"
              color="primary"
              class="mb-0 pb-0"
              :disabled=this.disabled_input              
            ></v-textarea>
            <div>
            <v-alert
              class="mt-0"
              type="info"
              title="Caution"
              text="Please check your content again. Once you have submitted your content, it is hard to change any thing."
              variant="tonal"
            ></v-alert>
          </div>

            <v-card-actions>
              <v-col cols="12">
              <v-btn
                variant="flat"
                width="100%"
                height="50"
                prepend-icon="mdi-send"
                color="blue"
                @click="submit = true"
                :disabled=this.disabled_input
                >Submit your infomation</v-btn
              >
              </v-col>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import { DatePicker } from "v-calendar";
//
export default {
  name: "ProFile",
  data() {
    return {
      submit: false,
      input_disabled : false,
      dateTime: null,
      atts: [
        {
          key: this.dateTime,
          dates: new Date(),
        },
      ],

      // v-calendar
      modelConfig: {
        type: "string",
        mask: "YYYY-MM-DD h:mm:A", // Uses 'iso' if missing
      },
      dateShow: false,
      // v-calendar      
      // input Rules
      numberRule: [
        (v) =>
          (!isNaN(parseFloat(v)) && v >= 0 && v <= 99999999999999) ||
          "Only Number Needed",
      ],
      user_nm_rule: [
        (v) => !!v || "This field Required",
        (v) => !(v && v.length >= 50) || "Only 50 characters you can put in",
        (v) =>
          !/[1234567890~!@#$%^&*()_+|<>?:{}]/.test(v) ||
          "No special characters, number is allowed.",
      ],
    };
  },
  computed: {
    ...mapState(["user", "content", "profile"]),
    disabled_input(){
      if (this.profile.user_order.status >= 2){
        return true
      }
      else{ 
        return false
      }
    }

  },
  components: {
    DatePicker,
  },

  methods: {
    ...mapMutations(["set_user_data", "set_language"]),
    ...mapActions(["get_user"]),

    dateShow_fn() {
      if (this.dateShow == true) {
        return;
      } else {
        this.dateShow == true;
      }
    },
    submitForm() {
      this.$store.dispatch("profile/submit_profile", {
        profile_id: this.profile.user_profile.id,
        data: this.profile.user_profile,
      });
    },
  },
};
</script>

<style>
</style>