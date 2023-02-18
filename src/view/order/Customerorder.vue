<template>
  <v-container fluid>
    <v-row class="justify-center pa-0 ma-3">
      <v-divider></v-divider>
      <div class="text-h7 font-italic ma-3">- Please select the order number -</div>
      <v-divider></v-divider>
    </v-row>
    <v-row class="justify-center">
        <v-card max-width="1000px" flat>
          <v-table>
            <thead>
              <tr>
                <th class="text-left">Order No</th>
                <th class="text-left">Product</th>
                <th class="text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in this.user_order" :key="item.id">
                <td>
                  <v-btn
                    variant="outlined"
                    color="deep-orange"
                    size="x-large"
                    @click="each_order(item.id, user_email)"
                    >{{ item.order_number }}</v-btn
                  >
                </td>
                <td>{{ item.product_title }}</td>
                <td>{{ display_date(item.date) }}</td>
              </tr>
            </tbody>
          </v-table>
        </v-card>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import moment from "moment";
// import { push_route } from '@/api/http';

export default {
  name: "CustomOrder",
  computed: {
    ...mapState(["profile"]),
    user_order() {
      return this.profile.orders_data;
    },
    user_email() {
      return this.profile.user_data.email;
    },
  },
  created(){
  },
  methods: {
    ...mapMutations(["set_user_data", "set_language"]),
    ...mapActions(["get_user"]),

    display_date(value) {
      if (this.profile.language == "EN") {
        return moment(String(value)).format("MM/DD/YYYY-hh:mm");
      } else {
        return moment(String(value)).format("DD/MM/YYYY-hh:mm");
      }
    },
    // ------------- profile ------------//
    each_order(order_id) {
      this.$store.dispatch("profile/get_profile", {
                                                    "order_id" : order_id,
                                                  })
    },

  },
};
</script>

<style>
</style>