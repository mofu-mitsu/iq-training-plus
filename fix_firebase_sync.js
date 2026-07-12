const fs = require('fs');
let code = fs.readFileSync('lib/firebase.ts', 'utf8');

const importStr = 'import { getFirestore, collection, addDoc, query, orderBy, getDocs, limit, serverTimestamp, where } from "firebase/firestore";';
const newImportStr = 'import { getFirestore, collection, addDoc, query, orderBy, getDocs, limit, serverTimestamp, where, doc, setDoc, getDoc } from "firebase/firestore";';

code = code.replace(importStr, newImportStr);

const appendCode = `
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
`;

code += appendCode;

fs.writeFileSync('lib/firebase.ts', code);
