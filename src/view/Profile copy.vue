<template>
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
            <v-toolbar-title >Hero/Heroin Information</v-toolbar-title>
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
            ></v-text-field>
            <v-text-field
              :rules="numberRule"
              v-model="this.profile.user_profile.phone"
              label="Contact Phone"
              density="compact"
              variant="underlined"
              color="primary"
            ></v-text-field>
            <v-text-field
              :rules="user_nm_rule"
              v-model="this.profile.user_profile.name_a"
              label="Name of Hero/Heroin"
              density="compact"
              variant="underlined"
              color="primary"
            ></v-text-field>
            <v-text-field
              :rules="user_nm_rule"
              v-model="this.profile.user_profile.name_b"
              label="name_a"
              density="compact"
              variant="underlined"
              color="primary"
            ></v-text-field>
            <v-text-field
              :rules="user_nm_rule"
              v-model="this.profile.user_profile.name_c"
              label="name_b"
              density="compact"
              variant="underlined"
              color="primary"
            ></v-text-field>
            <v-text-field
              :rules="user_nm_rule"
              v-model="this.profile.user_profile.name_d"
              label="name_c"
              density="compact"
              variant="underlined"
              color="primary"
            ></v-text-field>
            <v-text-field
              v-model="this.profile.user_profile.location"
              label="location"
              density="compact"
              variant="underlined"
              color="primary"
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
                    label="event date"
                    density="compact"
                    variant="underlined"
                    color="indigo"
                    v-bind="props"
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
            ></v-textarea>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn prepend-icon="mdi-email" color="deep-orange" size="x-large" @click="submitForm()" variant="outlined" block
                >Summit</v-btn>
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

export default {
  name: "ProFile",
  data() {
    return {
      dateTime: null,
      atts: [
        {
          key: this.dateTime,
          dates: new Date(),
        },
      ],
      modelConfig: {
        type: "string",
        mask: "YYYY-MM-DD h:mm:A", // Uses 'iso' if missing
      },
      // v-calendar
      dateShow: false,

      // Rules
      numberRule: [
        (v) =>
          (!isNaN(parseFloat(v)) && v >= 0 && v <= 99999999999999) ||
          "Only Number Needed",
      ],
      user_nm_rule: [
        (v) => !!v || "이름은 필수 입력사항입니다.",
        (v) => !(v && v.length >= 30) || "이름은 30자 이상 입력할 수 없습니다.",
        (v) =>
          !/[~!@#$%^&*()_+|<>?:{}]/.test(v) ||
          "이름에는 특수문자를 사용할 수 없습니다.",
      ],
    };
  },
  computed: {
    ...mapState(["user", "content", "profile"]),
  },
  components: {
    DatePicker,
  },

  methods: {
    ...mapMutations(["set_user_data", "set_language"]),
    ...mapActions(["get_user"]),

    submitForm() {
      this.$store.dispatch("profile/submit_profile",
      { 
        "profile_id" : this.profile.user_profile.id,
        "data" : this.profile.user_profile
        }
      )
    },
  },
};
</script>

<style>
</style>