import { UserModel } from "../api/models/user.model";
import { LoaderFunction, redirect } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../contexts/user/user.context";

export const getCurrentUser = async () => {
  // return localforage.getItem<UserModel>("currentUser");
};

export async function signOutUser() {
  // await localforage.removeItem("currentUser");
}

//Todo fix state:{from}
export const withAuth = (loaderFunction: LoaderFunction) => {
  const newFunction: LoaderFunction = async (args) => {
    const user = await getCurrentUser();
    if (!user) {
      return redirect("/auth");
    }

    return loaderFunction(args);
  };

  return newFunction;
};

export const useUserContext = () => useContext(UserContext);
