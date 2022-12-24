import { useFormik } from "formik";
import { FunctionComponent } from "react";
import { Button, Form } from "react-bootstrap";
import * as yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import { useUserContext } from "../../../utils/utils";
import { signInUserWithEmailAndPassword } from "../../../api/auth/AuthAPI";

interface SignInFormProps {}

const initialSignInFormValues = {
  email: "",
  password: "",
};

const signInFormSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const SignInForm: FunctionComponent<SignInFormProps> = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: initialSignInFormValues,
    validationSchema: signInFormSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(false);
      await signInUserWithEmailAndPassword(values.email, values.password);
    },
  });
  const { errors, touched, handleChange, values, handleBlur } = formik;

  return (
    <Form
      noValidate
      className="mt-5 border-start p-3 rounded"
      onSubmit={formik.handleSubmit}
    >
      <Form.Group className="mb-3" controlId="emailSignIn">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          name="email"
          placeholder="Enter email"
          value={values.email}
          onChange={handleChange}
          onBlur={formik.handleBlur}
          isValid={touched.email && !errors.email}
          isInvalid={touched.email && !!errors.email}
        />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
        <Form.Control.Feedback type="invalid">
          {errors.email}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="passwordSignIn">
        <Form.Label>Password</Form.Label>
        <Form.Control
          required
          type="password"
          name="password"
          placeholder="Password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          isValid={touched.password && !errors.password}
          isInvalid={touched.password && !!errors.password}
        />
        <Form.Control.Feedback type="invalid">
          {errors.password}
        </Form.Control.Feedback>
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default SignInForm;
