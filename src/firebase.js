// firebase.js

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'; // Import Firebase Auth module
import 'firebase/compat/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyA_3tN93t61i_unUdQRoesM8olicFb_weU",

    authDomain: "react-app-b01c4.firebaseapp.com",
  
    projectId: "react-app-b01c4",
  
    storageBucket: "react-app-b01c4.appspot.com",
  
    messagingSenderId: "233419003712",
  
    appId: "1:233419003712:web:3e766160c14758a4304ca5",
  
    measurementId: "G-2EKM1BRWRF"
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
