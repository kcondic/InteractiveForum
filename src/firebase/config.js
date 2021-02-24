import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDRCeVIPw5-fnPf5tTRuoqvpapqy8snYTA",
    authDomain: "interactiveforum-46b2a.firebaseapp.com",
    projectId: "interactiveforum-46b2a",
    storageBucket: "interactiveforum-46b2a.appspot.com",
    messagingSenderId: "305848544987",
    appId: "1:305848544987:web:c401d8c91b342566fde6fe",
    measurementId: "G-M1J1LHM2VY"
};

firebase.initializeApp(firebaseConfig);

const database = firebase.firestore();
const auth = firebase.auth();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export {
    database,
    auth,
    timestamp
};