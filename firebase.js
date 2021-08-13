import firebase from 'firebase';
// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBZglzo6Rt6DGRumBsFzaM-ocMjsl-b_t8",
  authDomain: "expo-2c378.firebaseapp.com",
  projectId: "expo-2c378",
  storageBucket: "expo-2c378.appspot.com",
  messagingSenderId: "834961288202",
  appId: "1:834961288202:web:632b867607c2a82ee083f3"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.database();
const dbRef = firebase.database().ref();
const auth = firebase.auth();

export { db, auth, dbRef };