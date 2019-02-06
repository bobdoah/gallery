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
                <a @click="addLike(image)">
                  <i
                    v-if="image.likes && user != null && image.likes[user.uid]"
                    class="material-icons"
                  >
                    favorite
                  </i>
                  <i v-else class="material-icons">favorite_border</i>
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
              <strong>
                {{ image.likeCount ? image.likeCount : "0" }} Likes
              </strong>
            </p>
            <template v-for="comment in image.comments">
              <a :key="comment.key">{{ comment.user }}</a>
              {{ comment.text }}
              <br :key="comment.key" />
            </template>
          </div>
        </div>
        <div class="card-footer">
          <div class="columns is-mobile">
            <div class="column is-11">
              <div class="field">
                <div class="control">
                  <input
                    :ref="'comment'"
                    v-on:keyup.enter="addComment(image, $event.target.value)"
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
  props: ["user"],
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
    },
    addComment(image, text) {
      if (this.user != null) {
        this.$firebaseRefs.images
          .child(image[".key"])
          .child("comments")
          .push({
            user: this.user.displayName,
            uid: this.user.uid,
            text: text
          });
      }
    },
    addLike(image) {
      if (this.user != null) {
        var uid = this.user.uid;
        this.$firebaseRefs.images
          .child(image[".key"])
          .transaction(function(image) {
            if (image) {
              if (image.likes && image.likes[uid]) {
                image.likeCount--;
                image.likes[uid] = null;
              } else {
                if (!image.likeCount) {
                  image.likeCount = 0;
                }
                image.likeCount++;
                if (!image.likes) {
                  image.likes = {};
                }
                image.likes[uid] = true;
              }
            }
            return image;
          });
      }
    }
  }
};
</script>
