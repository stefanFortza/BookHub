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
import { auth } from "../../utils/firebase";

class AuthApi {
  private auth: Auth;
  constructor(auth: Auth) {
    this.auth = auth;
  }

  public async signUpUserWithEmailAndPassword(
    email: string,
    password: string,
    displayName: string
  ) {
    const userCredentials = await createUserWithEmailAndPassword(
      this.auth,
      email,
      password
    );

    await updateProfile(userCredentials.user, {
      displayName,
    });

    return this.auth.currentUser;
  }

  public async signInUserWithEmailAndPassword(email: string, password: string) {
    const userCredential = await signInWithEmailAndPassword(
      this.auth,
      email,
      password
    );
    console.log(userCredential.user);
    return userCredential;
  }

  public async signOutUser() {
    return signOut(auth);
  }

  public onAuthStateChangedListner(callback: NextOrObserver<User>) {
    return onAuthStateChanged(this.auth, callback);
  }
}

export const AuthAPI = new AuthApi(auth);
