<template>
  <div class="columns body-columns">
    <div class="column is-half is-offset-one-quarter">
      <div id="firebaseui-auth-container"></div>
    </div>
  </div>
</template>
<script>
import firebase from "firebase";
import firebaseui from "firebaseui";
export default {
  name: "auth",
  mounted() {
    var uiConfig = {
      signInSuccessUrl: "/",
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        {
          provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
          recaptchaParameters: {
            type: "image", // "audio"
            size: "normal", // "invisible" or "compact"
            badge: "bottomleft" //" bottomright" or "inline" applies to invisible.
          },
          defaultCountry: "GB"
        }
      ]
    };
    var ui = new firebaseui.auth.AuthUI(firebase.auth());
    ui.start("#firebaseui-auth-container", uiConfig);
  }
};
</script>
