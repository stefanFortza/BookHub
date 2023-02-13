import { FunctionComponent } from "react";
import Book from "../book/book.component";
import { BookModel } from "../../../api/models/book.model";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface BookListProps {
  books: BookModel[];
}

const BookList: FunctionComponent<BookListProps> = ({ books }) => {
  const navigate = useNavigate();

  return (
    <>
      {!!books.length &&
        books.map((book) => (
          <Grid key={book.id} xs={6} md={4} lg={3} xl={2} item>
            {/* <Item> */}
            <Book book={book} />
            {/* </Item> */}
          </Grid>
        ))}
    </>
  );
};

export default BookList;
