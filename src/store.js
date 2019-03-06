import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    user: null
  },
  getters: {
    user(state) {
      return state.user;
    }
  },
  actions: {
    setUser(context, user) {
      context.commit("setUser", user);
    }
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    }
  }
});
export default store;
