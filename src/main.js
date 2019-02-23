import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Buefy from "buefy";
import Vuefire from "vuefire";
import VueAgile from "vue-agile";
import { firebaseApp } from "./firebase";

require("@/assets/css/instaAlbum.css");

Vue.use(Buefy);
Vue.use(Vuefire);
Vue.use(VueAgile);
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
      } else {
        this.user = null;
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
