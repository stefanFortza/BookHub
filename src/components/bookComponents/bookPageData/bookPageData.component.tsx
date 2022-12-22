import { FunctionComponent } from "react";
import { Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { BookModel } from "../../../api/models/book.model";
import { useAPI } from "../../../utils/hooks";
import { useUserContext } from "../../../utils/utils";

interface BookPageDataProps {
  book: BookModel;
}

const BookPageData: FunctionComponent<BookPageDataProps> = ({ book }) => {
  const navigate = useNavigate();
  const API = useAPI();
  const { currentUser } = useUserContext();
  const { title, author, description, price, id, userId, imageURLL } = book;

  const handleDelete: React.MouseEventHandler<HTMLButtonElement> = async (
    event
  ) => {
    if (book.id) {
      await API.BooksAPI.delete(book.id);
    }
    navigate("/");
  };

  const handleEdit: React.MouseEventHandler<HTMLButtonElement> = async (
    event
  ) => {
    navigate(`/books/edit/${id}`);
  };

  return (
    <>
      <Row xs={1} md={2} className="g-4 mt-4">
        <Col>
          <Card>
            <Card.Img variant="top" src={imageURLL} className="img-fluid" />
          </Card>
        </Col>
        <Col style={{ height: "200px" }}>
          <Card className="p-5">
            <Card.Body>
              <Card.Title className="" style={{ fontSize: "50px" }}>
                {title}
              </Card.Title>
              <Card.Text className="text-center"></Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroup.Item>Price: {price}</ListGroup.Item>
              <ListGroup.Item>{description}</ListGroup.Item>
              <ListGroup.Item className="text-center">{author}</ListGroup.Item>
            </ListGroup>
            <Row md={3} className="justify-content-center">
              <Button
                variant="primary"
                className="mt-3 mx-3"
                style={{ width: "80%" }}
              >
                Add to cart
              </Button>
              {currentUser?.id === book.userId ? (
                <Col>
                  <Button
                    variant="danger"
                    className="mt-3 mx-3"
                    onClick={handleDelete}
                    style={{ width: "100%" }}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="warning"
                    className="mt-3 mx-3"
                    style={{ width: "100%" }}
                    onClick={handleEdit}
                  >
                    Edit
                  </Button>
                </Col>
              ) : (
                ""
              )}
            </Row>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default BookPageData;
