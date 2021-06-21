import firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyAI9OvjeUf2TBsGA5aPFBubDD0kgRRN-w4",
    authDomain: "working-with-firebase-10047.firebaseapp.com",
    projectId: "working-with-firebase-10047",
    storageBucket: "working-with-firebase-10047.appspot.com",
    messagingSenderId: "845014267781",
    appId: "1:845014267781:web:ac063aacd17688fbd5b6ec"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

export default firebase;