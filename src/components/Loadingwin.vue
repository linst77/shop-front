<template>
  <div>
    <v-dialog 
    v-model="this.content.loading_win"
    :scrim="false" persistent width="auto">
      <v-card color="blue" width="400">
        <v-card-text>
          Please wait for uploading
          <v-progress-linear
            indeterminate
            rounded
            color="white"
            class="mb-3"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "LoadingWin",
  computed: {
    ...mapState(["content", "profile"]),
  }
};
</script>

<style>
</style>