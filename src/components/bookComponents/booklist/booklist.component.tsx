import { FunctionComponent, useState } from "react";
import Book from "../book/book.component";
import Filters from "../filters/filters.component";
import { BookModel } from "../../../api/models/book.model";
import { Grid, Paper, styled } from "@mui/material";

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
      <Grid item sx={{ display: { xs: "none", md: "block" } }} md={2}>
        <Item>
          <Filters setFilters={setFilters} books={books} />
        </Item>
      </Grid>
      <Grid item xs={12} md={10} container spacing={4}>
        {books.length ? (
          books
            .filter(
              (book) =>
                book.author.toLowerCase() === filters || filters === "all"
            )
            .map((book) => (
              <Grid key={book.id} xs={12} md={6} lg={4} item>
                {/* <Item> */}
                <Book book={book} />
                {/* </Item> */}
              </Grid>
            ))
        ) : (
          <Grid xs={12} item>
            "No books for this category"
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default BookList;
