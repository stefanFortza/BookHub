import { FunctionComponent } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { auth } from "./firebase";

interface PrivateRouteProps {}

const ProtectedRoute: FunctionComponent<PrivateRouteProps> = () => {
  const location = useLocation();
  console.log(location);

  if (!auth.currentUser) {
    return <Navigate to={"/auth"} state={{ from: location.pathname }} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
