import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore, collection, addDoc, query, orderBy, getDocs, limit, serverTimestamp, where, doc, setDoc, getDoc } from "firebase/firestore";

import config from "../firebase-applet-config.json";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || config.apiKey,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || config.authDomain,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || config.projectId,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || config.storageBucket,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || config.messagingSenderId,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || config.appId,
};

const app = !getApps().length && firebaseConfig.apiKey ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

export const loginWithGoogle = () => signInWithPopup(auth, provider);
export const logout = () => signOut(auth);

export const saveScore = async (userId: string, score: number, total: number, timeSpent: number) => {
  try {
    await addDoc(collection(db, "scores"), {
      userId,
      score,
      total,
      timeSpent,
      createdAt: serverTimestamp(),
    });
  } catch (e) {
    console.error("Error saving score: ", e);
  }
};

export const getTopScores = async () => {
  try {
    const q = query(collection(db, "scores"), orderBy("score", "desc"), orderBy("timeSpent", "asc"), limit(10));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (e) {
    console.error("Error getting top scores: ", e);
    return [];
  }
};

export const getUserHistory = async (userId: string) => {
  try {
    const q = query(collection(db, "scores"), where("userId", "==", userId), orderBy("createdAt", "desc"), limit(10));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (e) {
    console.error("Error getting user history: ", e);
    return [];
  }
};

export { auth, db };

export const saveUserData = async (userId: string, data: any) => {
  try {
    await setDoc(doc(db, "users", userId), data, { merge: true });
  } catch (e) {
    console.error("Error saving user data: ", e);
  }
};

export const getUserData = async (userId: string) => {
  try {
    const docSnap = await getDoc(doc(db, "users", userId));
    if (docSnap.exists()) {
      return docSnap.data();
    }
  } catch (e) {
    console.error("Error getting user data: ", e);
  }
  return null;
};
