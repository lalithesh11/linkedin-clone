import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyBZSDdEY2vOS74lATo3h3IFDXjlgP0DWVk",
    authDomain: "linkedin-clone-8cb27.firebaseapp.com",
    projectId: "linkedin-clone-8cb27",
    storageBucket: "linkedin-clone-8cb27.appspot.com",
    messagingSenderId: "1028699540193",
    appId: "1:1028699540193:web:87d2f3953c9718b5a705a0"
  };

//   Now our app was connected with the firebase for storing, hosting, authenticating ..
  const firebaseapp = firebase.initializeApp(firebaseConfig);
//   for firebase db connection and storage
const db=firebaseapp.firestore();
// for authenticating
const auth=firebase.auth();

export  {db,auth};

