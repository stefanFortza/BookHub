import { FunctionComponent, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Book from "../book/book.component";
import Filters from "../filters/filters.component";
import { BookModel } from "../../../api/models/book.model";
import { getAllBooks, getBooks } from "../../../api/BookAPI";

interface BooksProps {}

const BookList: FunctionComponent<BooksProps> = () => {
  const [filters, setFilters] = useState("all");
  const [books, setBooks] = useState<BookModel[]>([]);

  useEffect(() => {
    getBooks(25).then((books) => setBooks(books));
  });

  return (
    <Row xs={1} md={2} className="g-4 mt-4">
      <Col md={2}>
        <Filters setFilters={setFilters} />
      </Col>
      <Col md={10}>
        <Row xs={1} md={3} lg={4} xl={5} className="g-4">
          {books.length &&
            books
              .filter(
                (book) =>
                  book.author.toLowerCase() === filters || filters === "all"
              )
              .map((book) => (
                <Col key={book.id} md={4}>
                  <Book book={book} />
                </Col>
              ))}
        </Row>
      </Col>
    </Row>
  );
};

export default BookList;