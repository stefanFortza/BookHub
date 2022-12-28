import {
  Grid,
  Paper,
  Box,
  Avatar,
  Typography,
  TextField,
  Link,
  Button,
} from "@mui/material";
import { User } from "firebase/auth";
import { useFormik } from "formik";
import { FunctionComponent } from "react";
import {
  useLocation,
  useLoaderData,
  useNavigate,
  Navigate,
  LoaderFunction,
  defer,
} from "react-router-dom";
import { signInUserWithEmailAndPassword } from "../../api/AuthAPI";
import SuspenseWrapper from "../../utils/components/suspenseWrapper";
import * as yup from "yup";
import { getUser } from "../../utils/utils";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

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
    onSubmit: async (values, { setSubmitting, submitForm }) => {
      console.log(values);
      await signInUserWithEmailAndPassword(values.email, values.password);
      navigate("/");
    },
  });

  const { errors, touched, handleChange, values, handleBlur, handleSubmit } =
    formik;

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

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>

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
