<template>
  <div id="app">
    <div class="navbar is-inline-flex is-transparent">
      <div class="navbar-brand">
        <router-link
          class="navbar-item is-family-montez has-text-weight-bold is-size-2"
          to="/"
        >
          Sarah & Rob
        </router-link>
      </div>
      <div class="navbar-menu">
        <div class="navbar-item"></div>
      </div>
      <div class="navbar-item is-flex-touch">
        <router-link v-if="user" to="/upload" class="navbar-item">
          <i class="material-icons">add_a_photo</i>
        </router-link>
        <a class="navbar-item" v-if="user" @click="signOut">Sign out</a>
        <router-link v-else class="navbar-item" to="/auth">Sign in</router-link>
      </div>
    </div>
    <router-view :user="user" />
  </div>
</template>

<style lang="scss">
@import "assets/sass/style.scss";
</style>
<script>
import { firebaseApp } from "./firebase";
export default {
  props: ["user"],
  methods: {
    signOut() {
      firebaseApp.auth().signOut();
      this.$router.push("/auth");
    }
  }
};
</script>
