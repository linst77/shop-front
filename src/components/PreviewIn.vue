<template>
  <v-container>
    <v-row class="justify-center pa-0 ma-1">
      <v-card max-width="900px" class="pa-0" flat v-if="step == 2">
        <br />
        <v-alert
          border="start"
          variant="tonal"
          closable
          close-label="Close Alert"
          color="green"
          title="Preview not Founded"
        >
          There is no data with this. neque. Cras dapibus. Vivamus consectetuer
          hendrerit lacus. Sed mollis,
        </v-alert>
        <br />
        <v-btn variant="flat" color="green" width="100%" @click="testRun()">
          Download
        </v-btn>
      </v-card>
      
      <v-card max-width="900px" class="pa-0" flat v-if="step == 4 || step == 6 || step == 3">
        <v-alert
          variant="outlined"
          color="orange"
          title="Processing"
        >
          Please wait for while. We are working hard on it. We will email you when the work is done.
        </v-alert>
        <br>
        <v-img src="https://media.tenor.com/JeVCB8-bDlkAAAAC/work-hard-jim-carrey.gif" class="rounded-lg"> </v-img>
      </v-card>

      <v-card width="900" class="pa-0 ma-0" flat v-if="step == 5">
        <div class="container">
          <iframe
            class="responsive-iframe"
            src="https://player.vimeo.com/video/791837360?h=544f5e275e"
            allow="autoplay; fullscreen; picture-in-picture"
          ></iframe>
        </div>
        <br>
        <v-btn variant="flat" color="orange" width="100%" height="50" @click="testRun()">
          Confirm this preview
        </v-btn>
      </v-card>
      
      <v-card width="900" class="pa-0 ma-0" flat v-if="step == 7">
        <v-alert
          border="start"
          variant="tonal"
          closable
          close-label="Close Alert"
          color="green"
          title="Sorry we will miss you"
        >
          Sorry we will miss you
        </v-alert>
      </v-card>

      <v-card width="900" class="pa-0 ma-0" flat v-if="step == 8">
        <div class="container">
          <iframe
            class="responsive-iframe"
            src="https://player.vimeo.com/video/791837360?h=544f5e275e"
            allow="autoplay; fullscreen; picture-in-picture"
          ></iframe>
        </div>
        <br>
        <v-btn variant="flat" color="orange" width="100%" height="50" @click="testRun()">
          Download
        </v-btn>
      </v-card>



    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "vuex";

export default {
  props: ["step"],
  computed: {
    ...mapState(["profile"]),
  },
  methods: {
    testRun() {
      console.log("Download Works");
    },
  },
};
</script>

<style>
.container {
  position: relative;
  overflow: hidden;
  width: 100%;
  padding-top: 56.25%; /* 16:9 Aspect Ratio (divide 9 by 16 = 0.5625) */
}

/* Then style the iframe to fit in the container div with full height and width */
.responsive-iframe {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  border : None;

}
</style>