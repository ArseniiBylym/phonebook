import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/storage';

const config = {
    apiKey: "AIzaSyCDOdqPJB6dFRk1jQp3MMRQXobuEJ1i73U",
    authDomain: "phonebook-3a056.firebaseapp.com",
    databaseURL: "https://phonebook-3a056.firebaseio.com",
    projectId: "phonebook-3a056",
    storageBucket: "phonebook-3a056.appspot.com",
    messagingSenderId: "42904091954"
  };

firebase.initializeApp(config);

const firebaseDB = firebase.database();
const firebaseStorage = firebase.storage();

export {firebaseDB, firebaseStorage};