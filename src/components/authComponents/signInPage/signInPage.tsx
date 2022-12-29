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
import {
  AuthErrorCodes,
  FacebookAuthProvider,
  GoogleAuthProvider,
  fetchSignInMethodsForEmail,
  linkWithCredential,
  signInWithCredential,
} from "firebase/auth";
import { useFormik } from "formik";
import { FunctionComponent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  signInUserWithEmailAndPassword,
  signInWithFacebookPopUp,
  signInWithGooglePopUp,
} from "../../../api/AuthAPI";
import * as yup from "yup";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { FirebaseError } from "firebase/app";
import { ReactComponent as GoogleIcon } from "../../../assets/google.svg";
import FacebookIcon from "@mui/icons-material/Facebook";
import { auth } from "../../../utils/firebase";
import { signInWithFacebook } from "../../../utils/utils";

interface SignInPageProps {}

const initialSignInFormValues = {
  email: "",
  password: "",
};

const signInFormSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required().min(6),
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

const SignInPage: FunctionComponent<SignInPageProps> = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: initialSignInFormValues,
    validationSchema: signInFormSchema,
    onSubmit: async (values, { setSubmitting, submitForm, setFieldError }) => {
      try {
        console.log(values);
        await signInUserWithEmailAndPassword(values.email, values.password);
        navigate("/");
      } catch (e) {
        console.log(e);
        const error = e as FirebaseError;
        if (error.code === AuthErrorCodes.USER_DELETED) {
          setFieldError("email", "email not found");
        } else if (error.code === AuthErrorCodes.INVALID_PASSWORD) {
          setFieldError("password", "wrong password");
        }
      }
    },
  });

  const signInWithGoogle = async () => {
    await signInWithGooglePopUp();
    navigate("/");
  };

  const {
    errors,
    touched,
    handleChange,
    values,
    handleBlur,
    handleSubmit,
    setFieldError,
  } = formik;

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
        Sign in
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
              Sign In
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
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/auth/signup")}
              variant="body2"
            >
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
        <Copyright sx={{ mt: 5 }} />
      </Box>
    </Box>
  );
};

export default SignInPage;
