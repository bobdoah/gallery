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
  data() {
    return {
      user: null
    };
  },
  router,
  beforeCreate: function() {
    firebaseApp.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user;
      }
    });
  },
  render(h) {
    return h(App, {
      props: {
        user: this.user
      }
    });
  }
}).$mount("#app");
