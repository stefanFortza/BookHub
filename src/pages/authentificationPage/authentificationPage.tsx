import { FunctionComponent, useEffect, useMemo } from "react";
import { Col, Container, Row } from "react-bootstrap";
import SignInForm from "../../components/authComponents/signInForm/signInForm.component";
import SignUpForm from "../../components/authComponents/signUpForm/signUpForm.component";
import {
  LoaderFunction,
  redirect,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import { auth } from "../../utils/firebase";

interface SignUpPageProps {}

export const authentificationPageLoader: LoaderFunction = async () => {
  // const user = auth.;
  return {};
};

const AuthentificationPage: FunctionComponent<SignUpPageProps> = () => {
  const location = useLocation();
  console.log(location);

  return (
    <Container>
      <Row>
        <Col className="mt-5">
          <h1 className="text-center">Sign In</h1>
          <SignInForm from={location.state.from || "/"} />
        </Col>
        <Col className="mt-5">
          <h1 className="text-center">Sign Up</h1>
          <SignUpForm from={location.state.from || "/"} />
        </Col>
      </Row>
    </Container>
  );
};

export default AuthentificationPage;
