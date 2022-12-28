import {
  Grid,
  Box,
  Avatar,
  Typography,
  TextField,
  Link,
  Button,
} from "@mui/material";
import { useFormik } from "formik";
import { FunctionComponent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  signInUserWithEmailAndPassword,
  signUpUserWithEmailAndPassword,
} from "../../api/AuthAPI";
import * as yup from "yup";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

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
  password: yup.string().min(3).required(),
  confirmPassword: yup.string().min(3).required(),
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
      setSubmitting(false);
      const user = await signUpUserWithEmailAndPassword(
        values.email,
        values.password,
        values.displayName
      );

      navigate(0);
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

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign Up
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
