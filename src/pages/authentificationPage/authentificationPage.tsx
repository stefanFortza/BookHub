import { FunctionComponent } from "react";
import {
  LoaderFunction,
  Navigate,
  Outlet,
  defer,
  useLoaderData,
} from "react-router-dom";
import { getUser } from "../../utils/utils";
import { User } from "firebase/auth";
import SuspenseWrapper from "../../utils/components/suspenseWrapper";
import { Grid, Paper } from "@mui/material";

interface SignUpPageProps {}

export const authentificationPageLoader: LoaderFunction = async () => {
  const userPromise = getUser();
  return defer({ userPromise });
};

const AuthentificationPage: FunctionComponent<SignUpPageProps> = () => {
  const { userPromise } = useLoaderData() as {
    userPromise: Promise<User | null>;
  };

  return (
    <SuspenseWrapper
      resolve={userPromise}
      children={(user) =>
        user ? (
          <Navigate to="/" />
        ) : (
          <Grid container component="main" sx={{ height: "100vh" }}>
            <Grid
              item
              xs={false}
              sm={4}
              md={7}
              sx={{
                backgroundImage:
                  "url(https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80)",
                backgroundRepeat: "no-repeat",
                backgroundColor: (t) =>
                  t.palette.mode === "light"
                    ? t.palette.grey[50]
                    : t.palette.grey[900],
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <Grid
              item
              xs={12}
              sm={8}
              md={5}
              component={Paper}
              elevation={6}
              square
            >
              <Outlet />
            </Grid>
          </Grid>
        )
      }
    />
  );
};

export default AuthentificationPage;
