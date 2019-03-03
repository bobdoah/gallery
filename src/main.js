import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Buefy from "buefy";
import Vuefire from "vuefire";
import VueCarousel from "vue-carousel";
import { firebaseApp } from "./firebase";

require("@/assets/css/instaAlbum.css");

Vue.use(Buefy);
Vue.use(Vuefire);
Vue.use(VueCarousel);
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
        store.dispatch("setUser", user);
      } else {
        this.user = null;
        store.dispatch("setUser", null);
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
