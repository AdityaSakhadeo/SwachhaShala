import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDWsn3Py9y454S4YxSGZj1Zd32K9YGraCU",
    authDomain: "swachhashala-c8f0f.firebaseapp.com",
    projectId: "swachhashala-c8f0f",
    storageBucket: "swachhashala-c8f0f.appspot.com",
    messagingSenderId: "125254031242",
    appId: "1:125254031242:web:db9627443bab0d70d51a73",
    measurementId: "G-EJW9259CP0"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };