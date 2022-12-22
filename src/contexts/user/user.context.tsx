import { createContext, FunctionComponent, useState, useEffect } from "react";
import { User, UserCredential } from "firebase/auth";
import { AuthAPI } from "../../api/auth/AuthAPI";

interface IUserContext {
  currentUser: User | null;
}

interface UserContextProviderProps {
  children: React.ReactNode;
}

export const UserContext = createContext<IUserContext>({
  currentUser: null,
});

const UserContextProvider: FunctionComponent<UserContextProviderProps> = (
  props
) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = AuthAPI.onAuthStateChangedListner((user) => {
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  return (
    <UserContext.Provider value={{ currentUser }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;