import { FunctionComponent } from "react";
import { Container } from "react-bootstrap";
import BookList from "../../components/bookComponents/booklist/booklist.component";
import { LoaderFunction, useLoaderData } from "react-router-dom";
import { BookModel } from "../../api/models/book.model";
import { getBooks } from "../../api/BookAPI";

interface BooksPageProps {}

export const booksPageLoader: LoaderFunction = async (args) => {
  return getBooks(25);
};

const BooksPage: FunctionComponent<BooksPageProps> = () => {
  const books = useLoaderData() as BookModel[];

  return (
    <Container className="mx-4">
      <BookList books={books} />
    </Container>
  );
};

export default BooksPage;
