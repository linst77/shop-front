<template>
  <v-container>
    <v-row class="justify-center pa-0 ma-1">
      <v-card max-width="900px" class="pa-0" flat>
        <br />
        <v-alert
          border="start"
          variant="tonal"
          closable
          close-label="Close Alert"
          color="deep-purple-accent-4"
          title="No Order Founded"
        >
          Aenean imperdiet. Quisque id odio. Cras dapibus. Pellentesque ut
          neque. Cras dapibus. Vivamus consectetuer hendrerit lacus. Sed mollis,
          eros et ultrices tempus, mauris ipsum aliquam libero, non adipiscing
          dolor urna a orci. Sed mollis, eros et ultrices tempus, mauris ipsum
          aliquam libero, non adipiscing dolor urna a orci. Curabitur blandit
          mollis lacus. Curabitur ligula sapien, tincidunt non, euismod vitae,
          posuere imperdiet, leo.
        </v-alert>
        <br />
        <v-btn
          variant="flat"
          color="deep-purple-accent-4"
          width="100%"
          @click="delete_storage()"
        >
          Back to the Store
        </v-btn>
      </v-card>
    </v-row>
  </v-container>
</template>
<script>
import { back_to_store } from "@/api/http";

export default {
  name: "NoOrder",
  data: () => ({
  }),
  methods: {
    delete_storage() {
      back_to_store();
    },
  },
};
</script>

<style>
</style>