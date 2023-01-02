import { FunctionComponent } from "react";
import { LoaderFunction, useLoaderData } from "react-router-dom";
import BookData from "../../components/bookComponents/bookPageData/bookData.component";
import CommentForm from "../../components/commentComponents/commentForm/commentForm.component";
import CommentList from "../../components/commentComponents/commentList/commentList.component";
import { BookModel } from "../../api/models/book.model";
import { getBook } from "../../api/BookAPI";
import { Box, Container, Grid, Paper, styled } from "@mui/material";
import SearchWiki from "../../api/populate/searchWiki";

interface BookProps {}

export const showBookPageLoader: LoaderFunction = async ({ params }) => {
  const { bookId } = params;
  if (!bookId) {
    throw new Response("Book Not Found");
  }
  const book = await getBook(bookId);
  if (!book) throw new Response("Book Not Found");

  const description = await SearchWiki(book.title);
  if (description) book.description = description;

  return book;
};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const ShowBookPage: FunctionComponent<BookProps> = () => {
  const currentBook = useLoaderData() as BookModel;

  return (
    <Container className="mb-5">
      <h1 className="text-center my-5">{currentBook?.title}</h1>
      <BookData book={currentBook} />
      {/* <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner> */}
      <h1 className="text-center mt-5">De la acelasi autor:</h1>
      <h1 className="text-center mt-5">Comments Section</h1>
      <Box sx={{ flexGrow: 1, mt: 5 }}>
        <Grid container spacing={2}>
          <Grid xs={8} item>
            <Item sx={{ minHeight: "100%" }}>{currentBook.description}</Item>
          </Grid>
          <Grid xs={4} item>
            <Item>
              {currentBook && <CommentForm bookId={currentBook.id} />}
            </Item>
          </Grid>
        </Grid>{" "}
      </Box>

      {currentBook && <CommentList currentBook={currentBook} />}
    </Container>
  );
};

export default ShowBookPage;
