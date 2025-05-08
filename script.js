import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyAQttff_69-qmFt3QfOzCLDKrRdZ5BhSWE",
  authDomain: "login-bd4be.firebaseapp.com",
  projectId: "login-bd4be",
  storageBucket: "login-bd4be.appspot.com",
  messagingSenderId: "240153363717",
  appId: "1:240153363717:web:06e6f40dcfefe8bc1ea36c"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const adminEmails = [
  "ansh2008patella@gmail.com",
  "Devanshumrao9044@gmail.com"
];

// Sign Up
document.getElementById("signup-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("signup-name").value;
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {
      name,
      email,
      createdAt: new Date().toISOString()
    });

    redirectUser(email);
  } catch (error) {
    alert(error.message);
  }
});

// Sign In
document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    redirectUser(email);
  } catch (error) {
    alert(error.message);
  }
});

// Google Sign-In
document.getElementById("google-login").addEventListener("click", async () => {
  const provider = new GoogleAuthProvider();

  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    await setDoc(doc(db, "users", user.uid), {
      name: user.displayName,
      email: user.email,
      createdAt: new Date().toISOString()
    });

    redirectUser(user.email);
  } catch (error) {
    alert(error.message);
  }
});

// Redirect logic
function redirectUser(email) {
  if (adminEmails.includes(email)) {
    window.location.href = "admin.html";
  } else {
    window.location.href = "https://devansh-umrao-portfolio.netlify.app";
  }
}