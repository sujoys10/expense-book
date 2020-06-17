import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

const config = {
    apiKey: 'AIzaSyCE7hBV1drNkMZrYOobU42jQmWWj5xctF8',
    authDomain: "expense-book-14efe.firebaseapp.com",
    databaseURL: "https://expense-book-14efe.firebaseio.com/",
    storageBucket: "bucket.appspot.com"
};
firebase.initializeApp(config);

const auth = firebase.auth();
var googleAuthProvider = new firebase.auth.GoogleAuthProvider();
// Get a reference to the database service
const database = firebase.database();

export { firebase, auth, googleAuthProvider, database as default};
