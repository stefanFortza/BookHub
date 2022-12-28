import { FunctionComponent, useEffect, useMemo } from "react";
import { Col, Container, Row } from "react-bootstrap";
import SignInForm from "../../components/authComponents/signInForm/signInForm.component";
import SignUpForm from "../../components/authComponents/signUpForm/signUpForm.component";
import {
  LoaderFunction,
  Navigate,
  defer,
  redirect,
  useLoaderData,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import { auth } from "../../utils/firebase";
import { getUser, useUserContext } from "../../utils/utils";
import { User } from "firebase/auth";
import SuspenseWrapper from "../../utils/suspenseWrapper";

interface SignUpPageProps {}

export const authentificationPageLoader: LoaderFunction = async () => {
  const userPromise = getUser();
  return defer({ userPromise });
};

const AuthentificationPage: FunctionComponent<SignUpPageProps> = () => {
  const location = useLocation();
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
          <Container>
            <Row>
              <Col className="mt-5">
                <h1 className="text-center">Sign In</h1>
                <SignInForm from={location.state?.from || "/"} />
              </Col>
              <Col className="mt-5">
                <h1 className="text-center">Sign Up</h1>
                <SignUpForm from={location.state?.from || "/"} />
              </Col>
            </Row>
          </Container>
        )
      }
    />
  );
};

export default AuthentificationPage;
