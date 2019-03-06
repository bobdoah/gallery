<template>
  <div class="columns body-columns">
    <div class="column is-half is-offset-one-quarter">
      <div class="card">
        <div class="card-image">
          <picture-input
            ref="pictureInput"
            @change="onChanged"
            :autoToggleAspectRatio="true"
            :hideChangeButton="true"
            accept="image/jpeg, image/png"
            width="1080"
            height="720"
          />
        </div>
        <div class="card-content has-text-centered">
          <button
            class="button"
            @click="attemptUpload"
            v-bind:disabled="!user || !image || isUploading"
            v-bind:class="{
              'is-loading': isUploading,
              'is-danger': !uploadResult && uploadResult != null,
              'is-success': uploadResult || uploadResult == null
            }"
          >
            <i v-if="uploadResult" class="material-icons">check</i>
            <i
              v-else-if="!uploadResult && uploadResult != null"
              class="material-icons"
            >
              close
            </i>
            <span v-else>Upload</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PictureInput from "vue-picture-input";
import uploadImage from "../uploadImage";
import { mapState } from "vuex";
const filesize = require("filesize.js");
export default {
  data() {
    return {
      isUploading: false,
      uploadResult: null,
      image: ""
    };
  },
  components: {
    PictureInput
  },
  methods: {
    onChanged() {
      if (this.$refs.pictureInput.file) {
        this.uploadResult = null;
        const pictureInput = this.$refs.pictureInput;
        const pictureFile = pictureInput.file;
        this.image = {
          file: pictureInput.file,
          fileName: pictureFile.name,
          contentType: pictureFile.type
        };
      }
    },
    attemptUpload() {
      if (this.user && this.image) {
        this.isUploading = true;
        uploadImage(this.user, this.image)
          .then(snapshot => {
            this.isUploading = false;
            this.uploadResult = true;
            this.image = null;
            this.$toast.open({
              message:
                "Uploaded " + filesize(snapshot.totalBytes) + " successfully",
              type: "is-success",
              position: "is-bottom"
            });
          })
          .catch(error => {
            this.isUploading = false;
            this.uploadResult = false;
            this.$toast.open({
              message:
                "Failed to upload with error:<br/>" +
                error.code +
                ": " +
                error.message,
              type: "is-danger",
              position: "is-bottom"
            });
          });
      }
    }
  },
  computed: {
    ...mapState(["user"])
  }
};
</script>
