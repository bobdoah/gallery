<template>
  <div class="columns body-columns">
    <div class="column is-half is-offset-one-quarter">
      <Gallery />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Gallery from "@/components/Gallery.vue";

export default {
  name: "home",
  components: {
    Gallery
  }
};
</script>
