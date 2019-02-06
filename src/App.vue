<template>
  <div id="app">
    <div class="navbar is-inline-flex is-transparent">
      <div class="navbar-brand">
        <a class="navbar-item is-family-montez has-text-weight-bold is-size-2">
          Sarah & Rob
        </a>
      </div>
      <div class="navbar-menu">
        <div class="navbar-item"></div>
      </div>
      <div class="navbar-item is-flex-touch">
        <a class="navbar-item">
          <i class="material-icons">explore</i>
        </a>
        <a class="navbar-item">
          <i class="material-icons">favorite_border</i>
        </a>
        <a class="navbar-item" v-if="user" @click="signOut">Sign out</a>
        <a class="navbar-item" v-else href="auth">Sign in</a>
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
    }
  }
};
</script>
