import { FunctionComponent } from "react";
import { Container } from "react-bootstrap";
import EditBookForm from "../../components/bookComponents/editBookForm/editBookForm.component";

interface EditBookPageProps {}

const EditBookPage: FunctionComponent<EditBookPageProps> = () => {
  return (
    <Container className="w-50 mt-5">
      <h1 className="text-center">Edit Page</h1>
      <EditBookForm />
    </Container>
  );
};

export default EditBookPage;
