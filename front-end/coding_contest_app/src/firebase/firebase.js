import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCwDAzH72-4RCTficPgLbm1EWqBBaC2B3g",
  authDomain: "codehut-ac1d3.firebaseapp.com",
  projectId: "codehut-ac1d3",
  storageBucket: "codehut-ac1d3.appspot.com",
  messagingSenderId: "638356617058",
  appId: "1:638356617058:web:d88e12ecaa6595f2c25e3b",
  measurementId: "G-VSGJEHZ366"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(app);
const auth = getAuth(app);

export default auth;