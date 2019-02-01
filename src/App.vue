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
        <a class="navbar-item">
          <i class="material-icons">person_outline</i>
        </a>
      </div>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
@import "assets/sass/style.scss";
</style>
