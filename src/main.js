import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Buefy from "buefy";
import Vuefire from "vuefire";
import { firebaseApp } from "./firebase";

require("@/assets/css/instaAlbum.css");

Vue.use(Buefy);
Vue.use(Vuefire);
Vue.config.productionTip = false;

new Vue({
  router,
  created() {
    firebaseApp.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user;
      } else {
        this.user = null;
      }
    });
  },
  render: h => h(App)
}).$mount("#app");
