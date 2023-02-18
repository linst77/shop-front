<template>
  <v-container>
    <v-row class="justify-center pa-0 ma-1">
      <v-card max-width="900px" class="pa-0" flat>
        <br />
        <v-alert
          color="yellow-darken-4"
          icon="mdi-login"
          title="No User Information Found"
          variant="outlined"
        >
          Nullam tincidunt adipiscing enim. In consectetuer turpis ut velit.
          Maecenas egestas arcu quis ligula mattis placerat. Praesent metus
          tellus, elementum eu, semper a, adipiscing nec, purus.
        </v-alert>
        <br />
        <v-btn variant="flat" color="yellow-darken-4" width="100%" @click="delete_storage()">
          Back to the Store
        </v-btn>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
// import { del_local_storage } from '@/api/http.js'
// import { get_local_storage } from '@/api/http.js'
import { back_to_store } from '@/api/http';
import context from "@/assets/context.json"

export default {
  name: "NotFound",
  data() {
    return {
      alert: true,
    };
  },
  created(){
    console.log( context["EN"])
  },
  computed: {
  },

  methods: {
    delete_storage(){
        back_to_store()
      }
  },
};
</script>

<style>
</style>