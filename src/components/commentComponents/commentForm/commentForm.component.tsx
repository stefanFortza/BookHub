import { FunctionComponent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookModel } from "../../../api/models/book.model";
import "./commentForm.styles.css";
import { useUserContext } from "../../../utils/utils";
import { addComment } from "../../../api/CommentAPI";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";

interface CommentFormProps {
  bookId: string;
}

const initialValues = {
  comment: "",
  rating: 0,
};

const validationSchema = yup.object({
  comment: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  rating: yup.number().required("Rating in required"),
});

//TODO Add formik
const CommentForm: FunctionComponent<CommentFormProps> = ({ bookId }) => {
  const { currentUser } = useUserContext();
  const navigate = useNavigate();
  const [value, setValue] = useState<number | null>(2);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      // if (!currentUser?.uid) {
      //   navigate("/auth");
      //   return;
      // }

      // const form = event.currentTarget;
      // event.preventDefault();

      // if (form.checkValidity() === false) {
      //   event.stopPropagation();
      //   setValidated(true);
      //   return;
      // }

      // const id = await addComment(
      //   {
      //     ...formFields,
      //   },
      //   bookId,
      //   currentUser.uid
      // );

      navigate(0);
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

  return (
    <Card sx={{ minWidth: 275 }}>
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit}
        sx={{
          my: 8,
          mx: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <CardContent>
          <TextField
            id="outlined-multiline-static"
            label="Multiline"
            multiline
            rows={6}
            defaultValue="Default Value"
          />

          <Box>
            <Typography component="legend">Controlled</Typography>
            <Rating
              name="simple-controlled"
              value={value}
              onChange={(event, newValue) => {
                console.log(newValue);
                setValue(newValue);
              }}
            />
          </Box>
        </CardContent>
        <CardActions>
          <Button variant="outlined" type="submit">
            Submit
          </Button>
        </CardActions>
      </Box>
    </Card>
  );
};

export default CommentForm;
