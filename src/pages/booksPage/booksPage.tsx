import { FunctionComponent, Suspense } from "react";
import BookList from "../../components/bookComponents/booklist/booklist.component";
import { Await, LoaderFunction, defer, useLoaderData } from "react-router-dom";
import { BookModel } from "../../api/models/book.model";
import SuspenseWrapper from "../../utils/components/suspenseWrapper";
import { Box, Container, Grid, Skeleton } from "@mui/material";
import { BookAPI } from "../../api/BookAPI";

interface BooksPageProps {}

export const booksPageLoader: LoaderFunction = async (args) => {
  const booksPromise = BookAPI.getBooks(25);
  return defer({ booksPromise });
};

const BooksPage: FunctionComponent<BooksPageProps> = () => {
  const { booksPromise } = useLoaderData() as {
    booksPromise: Promise<BookModel[]>;
  };

  return (
    <SuspenseWrapper
      resolve={booksPromise}
      loadingComponent={
        <Skeleton variant="rectangular" width={1000} height={500} />
      }
      children={(books) => (
        <Container>
          <Box mt={5}>
            <BookList books={books} />
          </Box>
        </Container>
      )}
    />
  );
};

export default BooksPage;
