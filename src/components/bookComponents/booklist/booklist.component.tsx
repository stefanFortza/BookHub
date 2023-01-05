import { FunctionComponent, useEffect, useState } from "react";
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
  const [authorsChecked, setAuthorsChecked] = useState<string[]>([]);

  useEffect(() => {
    const newFilteredBooks = books.filter((book) =>
      authorsChecked.includes(book.author)
    );
    setFilteredBooks(newFilteredBooks);
    console.log(filteredBooks);
  }, [authorsChecked]);

  const handleToggle = (value: string) => () => {
    const currentIndex = authorsChecked.indexOf(value);
    const newChecked = [...authorsChecked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setAuthorsChecked(newChecked);
    // console.log(authorsChecked);
  };

  return (
    <Grid container spacing={2}>
      <Grid item sx={{ display: { xs: "none", md: "block" } }} md={3}>
        <Item sx={{ mb: 3, backgroundColor: "#252e38" }}>
          <Filters
            authorsChecked={authorsChecked}
            handleToggle={handleToggle}
            setAuthorsChecked={setAuthorsChecked}
            books={books}
          />
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
