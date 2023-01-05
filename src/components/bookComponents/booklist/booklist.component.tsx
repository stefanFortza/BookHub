import { FunctionComponent, useCallback, useEffect, useState } from "react";
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
  const [filteredBooks, setFilteredBooks] = useState<BookModel[]>([]);

  const handleCheckedAuthors = useCallback((filteredAuthors: string[]) => {
    console.log(filteredAuthors);

    const newFilteredBooks = books.filter((book) =>
      filteredAuthors.includes(book.author)
    );
    setFilteredBooks(newFilteredBooks);
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item sx={{ display: { xs: "none", md: "block" } }} md={3}>
        <Item sx={{ mb: 3, backgroundColor: "#252e38" }}>
          <Filters handleCheckedAuthors={handleCheckedAuthors} books={books} />
        </Item>
      </Grid>
      <Grid item xs={12} md={9} container spacing={4}>
        {filteredBooks.length
          ? filteredBooks.map((book) => (
              <Grid key={book.id} xs={6} md={4} lg={3} xl={2} item>
                {/* <Item> */}
                <Book book={book} />
                {/* </Item> */}
              </Grid>
            ))
          : books.map((book) => (
              <Grid key={book.id} xs={6} md={4} lg={3} xl={2} item>
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
