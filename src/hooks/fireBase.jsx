import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
export const provider = new GoogleAuthProvider();

const firebaseConfig = {
    apiKey: "AIzaSyBl2GgFCXU3wHhFkhY8Roh2MKcdYbxn27s",
    authDomain: "jsp-project-accf6.firebaseapp.com",
    projectId: "jsp-project-accf6",
    storageBucket: "jsp-project-accf6.firebasestorage.app",
    messagingSenderId: "963166509854",
    appId: "1:963166509854:web:031fbaf3bfe79925f2470f",
    measurementId: "G-Y2MF5EPSHB"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
