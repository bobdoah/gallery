<template>
  <carousel :per-page="1">
    <slide v-for="image of images.slice().reverse()" :key="image.key">
      <figure class="image">
        <img :src="image.thumbnail" />
      </figure>
    </slide>
  </carousel>
</template>
<script>
import { db } from "../firebase";
export default {
  data() {
    return {
      images: []
    };
  },
  firebase: {
    images: db.ref("images").orderByKey()
  }
};
</script>
