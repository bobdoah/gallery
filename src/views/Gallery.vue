<template>
  <div class="columns body-columns">
    <div class="column is-half is-offset-one-quarter">
      <div
        v-for="(image, index) of images.slice().reverse()"
        :key="image.key"
        class="card"
      >
        <div class="header">
          <div class="level">
            <div class="level-left">
              <div class="level-item">
                <figure class="image is-48x48">
                  <i v-if="image.user" class="material-icons is-large">
                    person
                  </i>
                  <i v-else class="material-icons icon is-large">camera_alt</i>
                </figure>
              </div>
              <div class="level-item">
                <p v-if="image.user" class="title is-4">{{ image.user }}</p>
                <p v-else class="title is-4">Booth Camera</p>
              </div>
            </div>
          </div>
        </div>
        <div class="card-image">
          <figure class="image">
            <img :src="image.thumbnail" />
          </figure>
        </div>
        <div class="card-content">
          <div class="level is-mobile">
            <div class="level-left">
              <div class="level-item has-text-centered">
                <a href="">
                  <i class="material-icons">favorite_border</i>
                </a>
              </div>
              <div class="level-item has-text-centered">
                <div>
                  <a v-on:click="setCommentFocus(index)">
                    <i class="material-icons">chat_bubble_outline</i>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div class="content">
            <p>
              <strong>32 Likes</strong>
            </p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
            nec iaculis mauris.
            <a>@bulmaio</a>.
            <a href="#">#css</a>
            <a href="#">#responsive</a>
            <br />
            <time datetime="2018-1-1">11:09 PM - 1 Jan 2018</time>
          </div>
        </div>
        <div class="card-footer">
          <div class="columns is-mobile">
            <div class="column is-11">
              <div class="field">
                <div class="control">
                  <input
                    :ref="'comment'"
                    class="input is-medium"
                    type="text"
                    placeholder="Add a comment . . ."
                  />
                </div>
              </div>
            </div>
            <div class="column has-text-centered">
              <button class="button">
                <i class="material-icons">more_horiz</i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
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
  },
  methods: {
    setCommentFocus(key) {
      this.$refs.comment[key].focus();
    }
  }
};
</script>
