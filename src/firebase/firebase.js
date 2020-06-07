import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

const config = {
    apiKey: process.env.GOOGLE_API_KEY,
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
/* const userId =1;
const month = 'JAN'
const item = database.ref('users/' + userId + '/templates' + month).push().key;
console.log(item)
database.ref('users/' + userId + '/templates' + month)
    .push({
        title: 'bus',
        catagory: 'transport',
        defaultExpense: '20'
    })

var connectedRef = database.ref(".info/connected");
connectedRef.on("value", function(snap) {
    if (snap.val() === true) {
    alert("connected");
    } else {
    alert("not connected");
    }
});     */