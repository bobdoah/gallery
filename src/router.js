import Vue from "vue";
import Router from "vue-router";
import Auth from "./components/Auth.vue";
import Gallery from "./views/Gallery.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "Gallery",
      component: Gallery
    },
    {
      path: "/auth",
      name: "Auth",
      component: Auth
    }
  ]
});
