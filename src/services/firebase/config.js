import firebase from "firebase/app";

import "firebase/auth";
import "firebase/storage";
import "firebase/firebase-database";
import "firebase/firestore";

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATA_BASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

export const sessionPersistence = firebase.auth.Auth.Persistence.SESSION;

firebase.initializeApp(config);

export const auth = firebase.auth();
export const storage = firebase.storage();
export const databaseFirebase = firebase.database();
export const fireStore = firebase.firestore();
