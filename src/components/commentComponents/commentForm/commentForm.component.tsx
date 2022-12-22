import { FunctionComponent, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { BookModel } from "../../../api/models/book.model";
import "./commentForm.styles.css";
import { useUserContext } from "../../../utils/utils";
import { useAPI } from "../../../utils/hooks";

interface CommentFormProps {
  currentBook: BookModel;
}

const initialValues = {
  comment: "",
  rating: 0,
};

//TODO Add formik
const CommentForm: FunctionComponent<CommentFormProps> = ({ currentBook }) => {
  const { currentUser } = useUserContext();
  const { CommentsAPI } = useAPI();
  const navigate = useNavigate();
  const [formFields, setFormFields] = useState(initialValues);
  const [validated, setValidated] = useState(false);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setFormFields((fields) => ({
      ...fields,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    if (!currentUser?.id) {
      navigate("/auth");
      return;
    }

    const form = event.currentTarget;
    event.preventDefault();

    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    if (!currentBook.id) {
      throw new Error("no book id");
    }

    const id = await CommentsAPI.add({
      ...formFields,
      bookId: currentBook.id,
      userId: currentUser.id,
    });

    setFormFields(initialValues);
  };
  return (
    <Row className="justify-content-md-center">
      <Card as={Col} className="my-5 col-6">
        <Card.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Add a comment</Form.Label>
              <Form.Control
                required
                as="textarea"
                placeholder="Add a comment"
                name="comment"
                onChange={handleChange}
                value={formFields.comment}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="">Rating:</Form.Label>
              <Form.Group>
                <Form.Check
                  inline
                  label="1"
                  name="rating"
                  type="radio"
                  id="1"
                  value="1"
                  required
                  onChange={handleChange}
                />
                <Form.Check
                  inline
                  label="2"
                  name="rating"
                  type="radio"
                  value="2"
                  id="2"
                  onChange={handleChange}
                />
                <Form.Check
                  inline
                  label="3"
                  name="rating"
                  type="radio"
                  value="3"
                  id="3"
                  onChange={handleChange}
                />
                <Form.Check
                  inline
                  label="4"
                  name="rating"
                  type="radio"
                  value="4"
                  id="4"
                  onChange={handleChange}
                />
                <Form.Check
                  inline
                  label="5"
                  name="rating"
                  type="radio"
                  value="5"
                  id="5"
                  onChange={handleChange}
                />
              </Form.Group>
            </Form.Group>

            <Button className="" variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Row>
  );
};

export default CommentForm;
