import { FC, useContext } from "react";
import { redirect, useNavigate } from "react-router-dom";
import { UserContext } from "../../../contexts/user/user.context";
import AuthentificationPage from "../../../pages/authentificationPage/authentificationPage";

const RequireAuth: FC<{ children: React.ReactElement }> = ({ children }) => {
  const { currentUser } = useContext(UserContext);

  if (!currentUser) {
    return <AuthentificationPage />;
  }
  return children;
};

export default RequireAuth;
