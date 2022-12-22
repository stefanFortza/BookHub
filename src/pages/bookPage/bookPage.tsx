import { FunctionComponent } from "react";
import { Container, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import BookPageData from "../../components/bookComponents/bookPageData/bookPageData.component";
import CommentForm from "../../components/commentComponents/commentForm/commentForm.component";
import CommentList from "../../components/commentComponents/commentList/commentList.component";

interface BookProps {}

const BookPage: FunctionComponent<BookProps> = () => {
  const { bookId } = useParams();

  return (
    <Container className="mb-5">
      {/* <h1 className="text-center my-5">{currentBook?.title}</h1> */}
      {/* {currentBook ? (
        <BookPageData book={currentBook} />
      ) : (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )} */}
      <h1 className="text-center mt-5">De la acelasi autor:</h1>
      <h1 className="text-center mt-5">Comments Section</h1>
      {/* {currentBook?.id && <CommentForm currentBook={currentBook} />} */}

      {/* {currentBook?.id && <CommentList currentBook={currentBook} />} */}
    </Container>
  );
};

export default BookPage;
