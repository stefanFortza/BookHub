import { FunctionComponent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookModel } from "../../../api/models/book.model";
import "./commentForm.styles.css";
import { useUserContext } from "../../../utils/utils";
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
import { CommentAPI } from "../../../api/CommentAPI";

interface CommentFormProps {
  book: BookModel;
}

const initialValues = {
  title: "",
  comment: "",
  rating: 0,
};

const validationSchema = yup.object({
  title: yup.string().required("Title is required"),
  comment: yup.string().required("Comment is required"),
  rating: yup.number().required("Rating in required"),
});

//TODO Add formik
const CommentForm: FunctionComponent<CommentFormProps> = ({ book }) => {
  const { currentUser } = useUserContext();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      if (!currentUser?.uid) {
        navigate("/auth");
        return;
      }

      const id = await CommentAPI.addComment(
        {
          ...values,
        },
        book,
        currentUser.uid
      );

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
    setFieldValue,
  } = formik;

  return (
    <Card sx={{ minWidth: 275 }}>
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        <CardContent sx={{ width: "100%" }}>
          <TextField
            sx={{ width: "100%", mb: 2 }}
            id="title"
            label="Title"
            variant="outlined"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.title}
            error={touched.title && !!errors.title}
            helperText={touched.title && errors.title}
          />
          <TextField
            sx={{ width: "100%", mb: 2 }}
            id="comment"
            label="Comment"
            multiline
            rows={6}
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.comment}
            error={touched.comment && !!errors.comment}
            helperText={touched.comment && errors.comment}
          />

          <Box>
            <Typography component="legend">Rating</Typography>
            <Rating
              id="rating"
              name="simple-controlled"
              value={values.rating}
              onBlur={handleBlur}
              // onChange={handleChange}
              onChange={(event, newValue) => {
                console.log(newValue);
                setFieldValue("rating", newValue);
              }}
              max={10}
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
