import { createContext, FunctionComponent, useState, useEffect } from "react";
import { User } from "firebase/auth";

import { UserModel } from "../../api/models/user.model";
import { AuthAPI } from "../../api/AuthAPI";

interface IUserContext {
  currentUser: User | null;
  userData: UserModel | null;
}

interface UserContextProviderProps {
  children: React.ReactNode;
}

export const UserContext = createContext<IUserContext>({
  currentUser: null,
  userData: null,
});

const UserContextProvider: FunctionComponent<UserContextProviderProps> = (
  props
) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentUserData, setCurrentUserData] = useState<UserModel | null>(
    null
  );

  useEffect(() => {
    const unsubscribe = AuthAPI.onAuthStateChangedListner((user) => {
      if (user) {
        AuthAPI.getUserData(AuthAPI.getUserDocRef(user.uid)).then(
          (userData) => {
            userData ? setCurrentUserData(userData) : setCurrentUserData(null);
            setCurrentUser(user);
          }
        );
      }
    });

    return unsubscribe;
  }, []);

  return (
    <UserContext.Provider value={{ currentUser, userData: currentUserData }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
