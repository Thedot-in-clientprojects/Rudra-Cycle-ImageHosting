// Modular Firebase v.9 Initialization.
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "@firebase/database";

const clientCredentials = {
    apiKey: "AIzaSyDdLMu2ZaIz4vuBcJbyKbTI6fHwH7H9nYw",
    authDomain: "rudra-cycle.firebaseapp.com",
    projectId: "rudra-cycle",
    storageBucket: "rudra-cycle.appspot.com",
    messagingSenderId: "276904438174",
    appId: "1:276904438174:web:fc6b76e33c44f5752a8e8f",
    measurementId: "G-WH4SEHPEKB"
};

function initFirebase() {
    if (typeof window !== undefined) {
        initializeApp(clientCredentials);
        console.log("Firebase has been init successfully");
    }
}

const app = initializeApp(clientCredentials);

const db = getFirestore(app);

const realDB = getDatabase(app);

export { initFirebase, db, realDB };