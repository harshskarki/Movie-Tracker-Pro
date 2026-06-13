"use strict";

const firebaseConfig = {
  apiKey: "AIzaSyCcUfxJmbe-iHSGSr8U_xDRKvG1Uz7okwM",
  authDomain: "movie-tracker-pro.firebaseapp.com",
  projectId: "movie-tracker-pro",
  storageBucket: "movie-tracker-pro.appspot.com",
  messagingSenderId: "261461241343",
  appId: "1:261461241343:web:727b75c82896b91ac0cbca",
  measurementId: "G-ZMRVPEWYGT"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();