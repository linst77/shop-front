import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import store from './store/store';
import router from './router/router.js';
import VCalendar from 'v-calendar';
import 'v-calendar/dist/style.css';

loadFonts()

createApp(App)
  .use(vuetify)
  .use(store)
  .use(router)
  .use(VCalendar, {})
  .mount('#app')
