import {
  Auth,
  NextOrObserver,
  User,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth, db } from "../utils/firebase";
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

  const userRef = doc(db, "users", user.uid) as DocumentReference<UserModel>;
  await setDoc(userRef, {
    displayName: user.displayName,
    email: user.email,
    id: user.uid,
  });

  return auth.currentUser;
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
