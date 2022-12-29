import { FunctionComponent, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Book from "../book/book.component";
import Filters from "../filters/filters.component";
import { BookModel } from "../../../api/models/book.model";
import { getAllBooks, getBooks } from "../../../api/BookAPI";
import { Box, Grid, Paper, styled } from "@mui/material";

interface BookListProps {
  books: BookModel[];
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const BookList: FunctionComponent<BookListProps> = ({ books }) => {
  const [filters, setFilters] = useState("all");

  return (
    <Grid container spacing={2}>
      <Grid item xs={2}>
        <Item>
          <Filters setFilters={setFilters} books={books} />
        </Item>
      </Grid>
      <Grid item xs={10} container spacing={4}>
        {books.length &&
          books
            .filter(
              (book) =>
                book.author.toLowerCase() === filters || filters === "all"
            )
            .map((book) => (
              <Grid key={book.id} xs={4} item>
                {/* <Item> */}
                <Book book={book} />
                {/* </Item> */}
              </Grid>
            ))}
      </Grid>
    </Grid>
  );
};

export default BookList;
