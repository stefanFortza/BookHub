import { FunctionComponent, Suspense } from "react";
import BookList from "../../components/bookComponents/booklist/booklist.component";
import { Await, LoaderFunction, defer, useLoaderData } from "react-router-dom";
import { BookModel } from "../../api/models/book.model";
import { getBooks } from "../../api/BookAPI";
import SuspenseWrapper from "../../utils/components/suspenseWrapper";
import { Box, Container, Grid } from "@mui/material";

interface BooksPageProps {}

export const booksPageLoader: LoaderFunction = async (args) => {
  const booksPromise = getBooks(25);
  return defer({ booksPromise });
};

const BooksPage: FunctionComponent<BooksPageProps> = () => {
  const { booksPromise } = useLoaderData() as {
    booksPromise: Promise<BookModel[]>;
  };

  return (
    <SuspenseWrapper
      resolve={booksPromise}
      children={(books) => (
        <Container disableGutters>
          <Box mt={5}>
            <BookList books={books} />
          </Box>
        </Container>
      )}
    />
    // <Suspense fallback={<Spinner />}>
    //   <Await resolve={booksPromise}>
    //     {(books) => (
    //       <Container className="mx-4">
    //         <BookList books={books} />
    //       </Container>
    //     )}
    //   </Await>
    // </Suspense>
  );
  // return (
  //   <Container className="mx-4">
  //     <BookList books={books} />
  //   </Container>
  // );
};

export default BooksPage;
