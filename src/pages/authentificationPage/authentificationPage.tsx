import { FunctionComponent } from "react";
import { Col, Container, Row } from "react-bootstrap";
import SignInForm from "../../components/authComponents/signInForm/signInForm.component";
import SignUpForm from "../../components/authComponents/signUpForm/signUpForm.component";

interface SignUpPageProps {}

const SignUpPage: FunctionComponent<SignUpPageProps> = () => {
  return (
    <Container>
      <Row>
        <Col className="mt-5">
          <h1 className="text-center">Sign In</h1>
          <SignInForm />
        </Col>
        <Col className="mt-5">
          <h1 className="text-center">Sign Up</h1>
          <SignUpForm />
        </Col>
      </Row>
    </Container>
  );
};

export default SignUpPage;
