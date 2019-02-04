import firebase from "firebase";

export const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAB_yBu6uCOLAD3ci1Cf-5H6sh_nuGbMBo",
  authDomain: "sarah-and-rob.firebaseapp.com",
  databaseURL: "https://sarah-and-rob.firebaseio.com",
  projectId: "sarah-and-rob",
  storageBucket: "sarah-and-rob.appspot.com",
  messagingSenderId: "793325439550"
});

export const db = firebaseApp.database();
