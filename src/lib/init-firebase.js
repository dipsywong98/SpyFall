import firebase from 'firebase'

let config = {
  apiKey: "AIzaSyBXULmzpWOIuOjZ6xxRENCUN-AuAjWBahQ",
  authDomain: "spy4-dev.firebaseapp.com",
  databaseURL: "https://spy4-dev.firebaseio.com",
  projectId: "spy4-dev",
  storageBucket: "spy4-dev.appspot.com",
  messagingSenderId: "614067862845"
};
firebase.initializeApp(config)
let database = firebase.database()
export {
  firebase,
  database
}
