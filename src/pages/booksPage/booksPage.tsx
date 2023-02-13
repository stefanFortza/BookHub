import { FunctionComponent, useEffect, useState } from "react";
import BookList from "../../components/bookComponents/booklist/booklist.component";
import { useLocation, useSearchParams } from "react-router-dom";
import { BookModel } from "../../api/models/book.model";
import {
  Box,
  Container,
  Grid,
  Paper,
  TablePagination,
  Typography,
  styled,
} from "@mui/material";
import { BookAPI } from "../../api/BookAPI";
import { QueryDocumentSnapshot } from "firebase/firestore";
import Filters from "../../components/bookComponents/filters/filters.component";

interface BooksPageProps {}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const BooksPage: FunctionComponent<BooksPageProps> = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const [books, setBooks] = useState<BookModel[]>([]);
  const [count, setCount] = useState(1);
  const [authorsChecked, setAuthorsChecked] = useState<string[]>([]);
  const [lastVisible, setLastVisible] =
    useState<QueryDocumentSnapshot<BookModel> | null>(null);
  const [goBackStack, setGoBackStack] = useState<
    QueryDocumentSnapshot<BookModel>[]
  >([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [category, setCategory] = useState("");
  const location = useLocation();

  console.log(goBackStack);

  useEffect(() => {
    searchParams.set("page", currentPage.toString());
    setSearchParams(searchParams);
    const newCategory = searchParams.get("category");
    if (newCategory) {
      setCategory(newCategory);
    }

    async function getBooks() {
      const authors = searchParams.getAll("authors");
      const { books, count, firstBook, lastBook } =
        await BookAPI.getBooksPaginated(authors, category);
      setBooks(books);
      setCount(count);
      setLastVisible(lastBook);
      setGoBackStack([firstBook]);
    }

    getBooks();
  }, [location.search]);

  useEffect(() => {
    setSearchParams({ authors: authorsChecked, page: "0", category });
    setCurrentPage(0);
  }, [authorsChecked]);

  const goBack = async () => {
    console.log("left");
    const authors = searchParams.getAll("authors");
    // console.log(firstVisible?.data());

    if (goBackStack.length) {
      const { books, count, firstBook, lastBook } =
        await BookAPI.getBooksPaginated(
          authors,
          category,
          goBackStack[goBackStack.length - 2]
        );
      setBooks(books);
      setCount(count);
      setLastVisible(lastBook);
      const newGoBackStack = [...goBackStack];
      newGoBackStack.splice(newGoBackStack.length - 1, 1);

      setGoBackStack(newGoBackStack);
    }
  };

  const goForward = async () => {
    console.log("right");
    const authors = searchParams.getAll("authors");
    if (lastVisible) {
      const { books, count, firstBook, lastBook } =
        await BookAPI.getBooksPaginated(authors, category, lastVisible);
      setGoBackStack([...goBackStack, firstBook]);

      setBooks(books);
      setCount(count);
      setLastVisible(lastBook);
    }
  };

  const handlePaginationChange = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    page: number
  ) => {
    if (page > currentPage) {
      goForward();
    } else {
      goBack();
    }
    setCurrentPage(page);
  };

  return (
    <Container sx={{ pb: 10 }}>
      <Typography variant="h2" sx={{ mt: 5 }}>
        Browse books
      </Typography>
      <Box mt={5}>
        <Grid container spacing={2}>
          <Grid item sx={{ display: { xs: "none", md: "block" } }} md={3}>
            <Item sx={{ mb: 3, backgroundColor: "#252e38" }}>
              <Filters
                authorsChecked={authorsChecked}
                setAuthorsChecked={setAuthorsChecked}
              />
            </Item>
          </Grid>
          <Grid item xs={12} md={9} container spacing={4}>
            <BookList books={books} />
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ mt: 10, display: "flex", justifyContent: "center" }}>
        <TablePagination
          component="div"
          count={count}
          page={currentPage}
          onPageChange={handlePaginationChange}
          rowsPerPage={10}
          // onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </Container>
  );
};

export default BooksPage;
