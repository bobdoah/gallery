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

const unsubscribe = firebaseApp.auth().onAuthStateChanged(user => {
  if (user) {
    store.dispatch("setUser", user);
  } else {
    store.dispatch("setUser", null);
  }
  new Vue({
    data() {
      return {
        user: null
      };
    },
    router,
    store,
    render(h) {
      return h(App, {
        props: {}
      });
    }
  }).$mount("#app");
  unsubscribe();
});
