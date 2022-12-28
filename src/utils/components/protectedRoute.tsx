import { FunctionComponent, Suspense, useEffect, useState } from "react";
import {
  Await,
  LoaderFunction,
  Navigate,
  Outlet,
  defer,
  useLoaderData,
  useLocation,
} from "react-router-dom";
import { User } from "firebase/auth";
import { getUser } from "../utils";
import { Spinner } from "react-bootstrap";

interface PrivateRouteProps {}

export const protectedRouteLoader: LoaderFunction = async (args) => {
  const userPromise = getUser();
  return defer({ user: userPromise });
};

const ProtectedRoute: FunctionComponent<PrivateRouteProps> = () => {
  const location = useLocation();
  const { user } = useLoaderData() as { user: Promise<User | null> };

  console.log(user);

  return (
    <Suspense fallback={<Spinner />}>
      <Await
        resolve={user}
        //TODO create error page
        errorElement={<div>Could not load Page 😬</div>}
        children={(usr) =>
          usr ? (
            <Outlet />
          ) : (
            <Navigate to={"/auth"} state={{ from: location.pathname }} />
          )
        }
      />
    </Suspense>
  );
};

export default ProtectedRoute;
