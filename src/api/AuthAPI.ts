import {
  Auth,
  NextOrObserver,
  User,
  createUserWithEmailAndPassword,
  linkWithPopup,
  onAuthStateChanged,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth, db, facebookProvider, googleProvider } from "../utils/firebase";
import { DocumentReference, doc, getDoc, setDoc } from "firebase/firestore";
import { UserModel } from "./models/user.model";

export async function signUpUserWithEmailAndPassword(
  email: string,
  password: string,
  displayName: string
) {
  const { user } = await createUserWithEmailAndPassword(auth, email, password);

  await updateProfile(user, {
    displayName,
  });

  createFirestoreUser(user);

  return user;
}
export async function signInWithGooglePopUp() {
  const userCredentials = await signInWithPopup(auth, googleProvider);

  await createFirestoreUser(userCredentials.user);

  console.log(userCredentials);
  return userCredentials;
}
export async function signInWithFacebookPopUp() {
  const userCredentials = await signInWithPopup(auth, facebookProvider);

  await createFirestoreUser(userCredentials.user);

  console.log(userCredentials);
  return userCredentials;
}

export async function createFirestoreUser(user: User) {
  const { uid, displayName, email } = user;
  const userRef = doc(db, "users", uid) as DocumentReference<UserModel>;
  const userDoc = await getDoc(userRef);
  if (!userDoc.exists()) {
    // await sendEmailVerification(user);

    await setDoc(userRef, {
      wishListRef: [],
      displayName,
      email,
      id: uid,
    });
  }
}

export async function signInUserWithEmailAndPassword(
  email: string,
  password: string
) {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  console.log(userCredential.user);
  return userCredential;
}

export async function signOutUser() {
  return signOut(auth);
}

export function onAuthStateChangedListner(callback: NextOrObserver<User>) {
  return onAuthStateChanged(auth, callback);
}

export function getUserDocRef(userId: string): DocumentReference<UserModel> {
  return doc(db, "users", userId) as DocumentReference<UserModel>;
}

export async function getUserData(
  userRef: DocumentReference<UserModel>
): Promise<UserModel | undefined> {
  return (await getDoc(userRef)).data();
}
