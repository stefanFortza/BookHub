import { useFormik } from "formik";
import { FunctionComponent, useContext, useEffect, useMemo } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { BookModel } from "../../../api/models/book.model";
import { UserContext } from "../../../contexts/user/user.context";

interface EditBookFormProps {}

const EditBookSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, "Too Short")
    .max(50, "Too Long!")
    .required("Required"),
  price: Yup.number().required("Required"),
  author: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  description: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});

const EditBookForm: FunctionComponent<EditBookFormProps> = (props) => {
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();
  const { bookId } = useParams();
  const currentBook = useLoaderData() as BookModel;

  const defaultFormFields = useMemo(
    () => ({
      title: currentBook.title,
      price: currentBook.price,
      author: currentBook.author,
      description: currentBook.description,
    }),
    [currentBook]
  );

  const formik = useFormik({
    initialValues: defaultFormFields,
    onSubmit: async (values, { setSubmitting, validateForm }) => {},
    validationSchema: EditBookSchema,
  });

  const { handleSubmit, handleChange, handleBlur, values, touched, errors } =
    formik;

  return (
    <Form
      noValidate
      className="mt-5 border p-3 rounded"
      onSubmit={handleSubmit}
    >
      <Form.Group controlId="formGridEmail">
        <Form.Label>Book Title</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="Enter book title"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.title}
          name="title"
          isValid={touched.title && !errors.title}
          isInvalid={touched.title && !!errors.title}
        />
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">
          {errors.title}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="formGridPassword">
        <Form.Label>Book Price</Form.Label>
        <InputGroup hasValidation>
          <InputGroup.Text id="inputGroupPrepend">$</InputGroup.Text>
          <Form.Control
            required
            type="number"
            placeholder="0.00"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.price}
            name="price"
            isValid={touched.price && !errors.price}
            isInvalid={touched.price && !!errors.price}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            {errors.price}
          </Form.Control.Feedback>
        </InputGroup>
      </Form.Group>

      <Form.Group controlId="formGridEmail">
        <Form.Label>Book Author</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="Enter book author"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.author}
          name="author"
          isValid={touched.author && !errors.author}
          isInvalid={touched.author && !!errors.author}
        />
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">
          {errors.author}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGridAddress2">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Enter book description"
          name="description"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.description}
          isValid={touched.description && !errors.description}
          isInvalid={touched.description && !!errors.description}
        />
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">
          {errors.description}
        </Form.Control.Feedback>
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default EditBookForm;
