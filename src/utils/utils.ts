import { useContext } from "react";
import { UserContext } from "../contexts/user/user.context";
import {
  onAuthStateChangedListner,
  signInWithFacebookPopUp,
} from "../api/AuthAPI";
import { AuthErrorCodes, User } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { NavigateFunction } from "react-router-dom";

type FieldErrorFunction = (field: string, value: string | undefined) => void;

export const useUserContext = () => useContext(UserContext);

export const getUser = () => {
  return new Promise<User | null>((resolve, reject) => {
    // setTimeout(() => {
    const unsubscribe = onAuthStateChangedListner((user) => {
      resolve(user);
    });
    unsubscribe();
    // }, 1000);
  });
};

export const signInWithFacebook = async (
  navigate: NavigateFunction,
  setFieldError: FieldErrorFunction
) => {
  try {
    await signInWithFacebookPopUp();
    navigate("/");
  } catch (e) {
    const error = e as FirebaseError;
    if (error.code === AuthErrorCodes.NEED_CONFIRMATION) {
      setFieldError(
        "email",
        "account with your email already exists, please log in and link your account"
      );
    }
  }
};
