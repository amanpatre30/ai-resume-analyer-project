import { initializeApp } from "firebase/app";
import {
 getAuth,
 GoogleAuthProvider
} from "firebase/auth";

const firebaseConfig = {
 apiKey: "AIzaSyC8ie7H5hS9ry_IRjkxT7aWLO11AbSwauQ",
 authDomain: "mernai-de00a.firebaseapp.com",
 projectId: "mernai-de00a",
 storageBucket: "mernai-de00a.firebasestorage.app",
 messagingSenderId: "981831916273",
 appId: "1:981831916273:web:eeafe4bb52ab19165f6750",
 measurementId: "G-3MMWVZP0SQ"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
 prompt: "select_account"
});

export { auth, provider };