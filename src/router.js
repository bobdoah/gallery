import Vue from "vue";
import Router from "vue-router";
import Auth from "./components/Auth.vue";
import Gallery from "./views/Gallery.vue";
import Upload from "./views/Upload.vue";
import Carousel from "./views/Carousel.vue";
import store from "./store";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "Gallery",
      component: Gallery,
      meta: { requiresAuth: true }
    },
    {
      path: "/auth",
      name: "Auth",
      component: Auth
    },
    {
      path: "/upload",
      name: "Upload",
      component: Upload,
      meta: { requiresAuth: true }
    },
    {
      path: "/carousel",
      name: "Carousel",
      component: Carousel,
      meta: { requiresAuth: true }
    }
  ]
});
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  if (requiresAuth && !store.getters.getUser) {
    next("/auth");
  } else {
    next();
  }
});

export default router;
