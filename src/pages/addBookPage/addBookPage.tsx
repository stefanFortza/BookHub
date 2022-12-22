import { FunctionComponent } from "react";
import { Container } from "react-bootstrap";
import AddBookForm from "../../components/bookComponents/addBookForm/addBookForm.component";

interface AddBookRouteProps {}

const AddBookPage: FunctionComponent<AddBookRouteProps> = () => {
  return (
    <Container className="w-50">
      <h1 className="mt-4 text-center">Add a new book</h1>
      <AddBookForm />
    </Container>
  );
};

export default AddBookPage;
