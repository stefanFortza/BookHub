import {
  Grid,
  Box,
  Avatar,
  Typography,
  TextField,
  Link,
  Button,
  ButtonGroup,
} from "@mui/material";
import { useFormik } from "formik";
import { FunctionComponent } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import * as yup from "yup";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { FirebaseError } from "firebase/app";
import { ReactComponent as GoogleIcon } from "../../../assets/google.svg";
import FacebookIcon from "@mui/icons-material/Facebook";
import { AuthErrorCodes } from "firebase/auth";
import { auth } from "../../../utils/firebase";
import { signInWithFacebook } from "../../../utils/utils";
import { AuthAPI } from "../../../api/AuthAPI";

interface SignInPageProps {}

const initialSignUpFormValues = {
  email: "",
  password: "",
  displayName: "",
  confirmPassword: "",
};

const signUpFormSchema = yup.object({
  email: yup.string().email().required(),
  displayName: yup.string().min(3).required(),
  password: yup.string().min(6).required(),
  confirmPassword: yup.string().min(6).required(),
});

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Book Shop
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const SignUpPage: FunctionComponent<SignInPageProps> = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: initialSignUpFormValues,
    validationSchema: signUpFormSchema,
    onSubmit: async (values, { setSubmitting, setFieldError }) => {
      setSubmitting(true);
      try {
        const user = await AuthAPI.signUpUserWithEmailAndPassword(
          values.email,
          values.password,
          values.displayName
        );

        navigate(0);
      } catch (e) {
        if ((e as FirebaseError).code === "auth/email-already-in-use") {
          setFieldError("email", "email already used");
        }
      }
      setSubmitting(false);
    },
  });

  const {
    errors,
    touched,
    handleChange,
    values,
    handleBlur,
    handleSubmit,
    setFieldError,
  } = formik;

  const signInWithGoogle = async () => {
    await AuthAPI.signInWithGooglePopUp();
    navigate("/");
  };

  return (
    <Box
      sx={{
        my: 8,
        mx: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <LockOutlinedIcon />
      </Avatar>

      <Typography component="h1" variant="h5">
        Sign up
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.email && !!errors.email}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="displayName"
          label="Display Name"
          type="text"
          id="displayName"
          autoComplete="displayName"
          value={values.displayName}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.displayName && !!errors.displayName}
          helperText={touched.displayName && errors.displayName}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.password && !!errors.password}
          helperText={touched.password && errors.password}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          id="confirmPassword"
          autoComplete="current-password"
          value={values.confirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.confirmPassword && !!errors.confirmPassword}
          helperText={touched.confirmPassword && errors.confirmPassword}
        />

        <Box
          sx={{
            display: "flex",
            "& > *": {
              m: 1,
            },
          }}
        >
          <ButtonGroup
            orientation="vertical"
            aria-label="vertical contained button group"
            variant="contained"
            fullWidth
          >
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ p: 2, fontSize: 18 }}
            >
              Sign Up
            </Button>
            <Button
              type="button"
              fullWidth
              variant="contained"
              sx={{
                backgroundColor: "white",
                mt: 2,
                p: 1,
                fontSize: 18,
                color: "black",
              }}
              onClick={signInWithGoogle}
            >
              <GoogleIcon />
              Sign In With Google
            </Button>
            <Button
              type="button"
              fullWidth
              variant="contained"
              sx={{
                backgroundColor: "lightblue",
                mt: 2,
                p: 1,
                fontSize: 18,
                color: "black",
              }}
              onClick={() => signInWithFacebook(navigate, setFieldError)}
            >
              <FacebookIcon style={{ fontSize: 50 }} />
              Sign In With Facebook
            </Button>
          </ButtonGroup>
        </Box>

        <Grid container>
          <Grid item xs>
            <Link
              onClick={() => {
                // sendPasswordResetEmail(auth, "tacustefan74@gmail.com");
                // console.log("da");
              }}
              variant="body2"
            >
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/auth")}
              variant="body2"
            >
              {"Have an account? Sign In"}
            </Link>
          </Grid>
        </Grid>
        <Copyright sx={{ mt: 5 }} />
      </Box>
    </Box>
  );
};

export default SignUpPage;
