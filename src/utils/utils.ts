import { useContext } from "react";
import { UserContext } from "../contexts/user/user.context";
import { AuthErrorCodes, User } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { NavigateFunction } from "react-router-dom";
import { CartContext } from "../contexts/cart/cart.context";
import { AuthAPI } from "../api/AuthAPI";

type FieldErrorFunction = (field: string, value: string | undefined) => void;

export const useUserContext = () => useContext(UserContext);
export const useCartContext = () => useContext(CartContext);

export const getUser = () => {
  return new Promise<User | null>((resolve, reject) => {
    // setTimeout(() => {
    const unsubscribe = AuthAPI.onAuthStateChangedListner((user) => {
      resolve(user);
    });
    unsubscribe();
    // }, 2000);
  });
};

export const signInWithFacebook = async (
  navigate: NavigateFunction,
  setFieldError: FieldErrorFunction
) => {
  try {
    await AuthAPI.signInWithFacebookPopUp();
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

export function capitalizeFirstLetter(string: string | undefined) {
  if (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  return "";
}
