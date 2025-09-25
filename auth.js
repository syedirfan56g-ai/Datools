// auth.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";
import { getFirestore, doc, getDoc, serverTimestamp, setDoc } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDZJLeVm2eV0ib5QcokdZ6aguZ_UmF0V64",
  authDomain: "datools-1fad4.firebaseapp.com",
  projectId: "datools-1fad4",
  storageBucket: "datools-1fad4.firebasestorage.app",
  messagingSenderId: "573181909357",
  appId: "1:573181909357:web:9f071661ed3d493ddb6264",
  measurementId: "G-QCSSS49JCL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// DOM elements
const loginBtn = document.getElementById("login-btn");
const registerBtn = document.getElementById("register-btn");
const profileBtn = document.getElementById("profile-btn");

// Show/hide buttons based on auth state
onAuthStateChanged(auth, async (user) => {
  if(user){
    // User logged in → show profile button, hide login/register
    loginBtn.style.display = "none";
    registerBtn.style.display = "none";
    profileBtn.style.display = "inline-block";

    // Optional: store last login
    const userRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(userRef);
    if(!docSnap.exists()){
      await setDoc(userRef, { vip: false, lastLogin: serverTimestamp() });
    }
  } else {
    // No user → show login/register, hide profile
    loginBtn.style.display = "inline-block";
    registerBtn.style.display = "inline-block";
    profileBtn.style.display = "none";
  }
});

// Redirect profile button to profile.html
profileBtn.addEventListener("click", () => {
  window.location.href = "profile.html";
});
