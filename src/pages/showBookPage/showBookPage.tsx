import { FunctionComponent, useEffect, useState } from "react";
import { Container, Spinner } from "react-bootstrap";
import {
  LoaderFunction,
  LoaderFunctionArgs,
  useLoaderData,
  useParams,
} from "react-router-dom";
import BookPageData from "../../components/bookComponents/bookPageData/bookPageData.component";
import CommentForm from "../../components/commentComponents/commentForm/commentForm.component";
import CommentList from "../../components/commentComponents/commentList/commentList.component";
import { BookModel } from "../../api/models/book.model";
import { getBook } from "../../api/BookAPI";

interface BookProps {}

export const showBookPageLoader: LoaderFunction = async ({ params }) => {
  const { bookId } = params;
  if (!bookId) {
    throw new Response("Book Not Found");
  }
  const book = await getBook(bookId);
  if (!book) throw new Response("Book Not Found");

  // const comments =
  return book;
};

const ShowBookPage: FunctionComponent<BookProps> = () => {
  const currentBook = useLoaderData() as BookModel;

  return (
    <Container className="mb-5">
      <h1 className="text-center my-5">{currentBook?.title}</h1>
      <BookPageData book={currentBook} />
      {/* <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner> */}
      <h1 className="text-center mt-5">De la acelasi autor:</h1>
      <h1 className="text-center mt-5">Comments Section</h1>
      {currentBook && <CommentForm bookId={currentBook.id} />}

      {currentBook && <CommentList currentBook={currentBook} />}
    </Container>
  );
};

export default ShowBookPage;
