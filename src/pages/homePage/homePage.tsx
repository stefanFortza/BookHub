import {
  Box,
  Container,
  Grid,
  Link,
  Paper,
  Typography,
  styled,
} from "@mui/material";
import { FunctionComponent, HTMLProps, useEffect, useState } from "react";
import HomeImage from "../../components/homeImage/homeImage";
import { useNavigate } from "react-router-dom";
import { BookModel } from "../../api/models/book.model";
import BookList from "../../components/bookComponents/booklist/booklist.component";
import { BookAPI } from "../../api/BookAPI";

interface HomePageProps {}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

//"https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"

const HomePage: FunctionComponent<HomePageProps> = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState<BookModel[]>([]);

  useEffect(() => {
    const getBooks = async () => {
      const newBooksPromise: Promise<BookModel | undefined>[] = [];
      for (let i = 0; i < 4; i++) {
        const rand = Math.floor(Math.random() * 500);
        const book = BookAPI.getBook(rand.toString());
        newBooksPromise.push(book);
      }
      const newBooks = await Promise.all(newBooksPromise);
      setBooks(newBooks as BookModel[]);
    };
    // BookAPI.getBook("24").then((book) => (book ? setBooks([book]) : null));
    getBooks();
  }, []);

  return (
    <Container>
      <Typography
        sx={{ textAlign: "center", my: 2 }}
        component="h1"
        variant="h2"
      >
        Home Page
      </Typography>
      <Box sx={{ mt: 3 }}>
        <Link
          sx={{ cursor: "pointer", fontSize: 35, color: "white" }}
          onClick={() => navigate("/books")}
          underline="none"
        >
          Discover Brand New Books
        </Link>
      </Box>
      <Box sx={{ mt: 4 }}>
        <Grid item xs={12} md={12} container spacing={4}>
          <BookList books={books} />
        </Grid>
      </Box>
    </Container>
  );
};

export default HomePage;
