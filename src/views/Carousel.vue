<template>
  <agile
    :arrows="false"
    :speed="750"
    :timing="'linear'"
    :fade="true"
    :autoplay="true"
    :pauseOnHoover="false"
  >
    <div
      v-for="image of images.slice().reverse()"
      :key="image.key"
      class="slide"
    >
      <figure class="image">
        <img :src="image.thumbnail" />
      </figure>
    </div>
  </agile>
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
