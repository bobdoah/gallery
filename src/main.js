import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Buefy from "buefy";
import Vuefire from "vuefire";
import "./firebase";

require("@/assets/css/instaAlbum.css");

Vue.use(Buefy);
Vue.use(Vuefire);
Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
