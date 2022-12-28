import { useContext } from "react";
import { UserContext } from "../contexts/user/user.context";
import { onAuthStateChangedListner } from "../api/AuthAPI";
import { User } from "firebase/auth";

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
