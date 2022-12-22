import { FunctionComponent, useEffect, useState } from "react";
import { Container, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import BookPageData from "../../components/bookComponents/bookPageData/bookPageData.component";
import CommentForm from "../../components/commentComponents/commentForm/commentForm.component";
import CommentList from "../../components/commentComponents/commentList/commentList.component";
import { BookModel } from "../../api/models/book.model";
import { getBook } from "../../api/BookAPI";

interface BookProps {}

const BookPage: FunctionComponent<BookProps> = () => {
  const { bookId } = useParams();
  const [currentBook, setCurrentBook] = useState<BookModel | undefined>(
    undefined
  );

  useEffect(() => {
    if (bookId) {
      getBook(bookId).then((book) => setCurrentBook(book));
    }
  }, []);

  return (
    <Container className="mb-5">
      <h1 className="text-center my-5">{currentBook?.title}</h1>
      {currentBook ? (
        <BookPageData book={currentBook} />
      ) : (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
      <h1 className="text-center mt-5">De la acelasi autor:</h1>
      <h1 className="text-center mt-5">Comments Section</h1>
      {currentBook && <CommentForm currentBook={currentBook} />}

      {currentBook && <CommentList currentBook={currentBook} />}
    </Container>
  );
};

export default BookPage;
