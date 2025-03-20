import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDZDNbUo2MHyrz1aPa9QRgt-aGfPHnlpcQ",
  authDomain: "moviesapp-404ab.firebaseapp.com",
  projectId: "moviesapp-404ab",
  storageBucket: "moviesapp-404ab.appspot.com",
  messagingSenderId: "701616359054",
  appId: "moviesapp-404ab",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase Auth
export const auth = getAuth(app);