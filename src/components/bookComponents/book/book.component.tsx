import { FunctionComponent } from "react";
import { Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BookModel } from "../../../api/models/book.model";

interface BookProps extends React.HTMLAttributes<HTMLElement> {
  book: BookModel;
}

const Book: FunctionComponent<BookProps> = ({ book, ...other }) => {
  const { title, price, imageURLL } = book;

  return (
    <Card {...other}>
      <Link to={`/books/show/${book.id}`}>
        <Card.Img
          variant="top"
          src={imageURLL}
          // src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80"
          className="img-fluid"
          style={{ maxWidth: "1000px", height: "auto" }}
        />
      </Link>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{price.toFixed(2)} RON</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Book;
