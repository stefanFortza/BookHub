import { Box, Container, Grid, Typography } from "@mui/material";
import { FunctionComponent, useEffect, useState } from "react";
import { LoaderFunction } from "react-router-dom";
import { useUserContext } from "../../utils/utils";
import { BookModel } from "../../api/models/book.model";
import { getDocs } from "firebase/firestore";
import { BookAPI } from "../../api/BookAPI";
import BookList from "../../components/bookComponents/booklist/booklist.component";
import WishListBook from "./wishListBook";

interface WishListPageProps {}

// const wishListPageLoader: LoaderFunction = async ({ params, request }) => {

// };

const WishListPage: FunctionComponent<WishListPageProps> = () => {
  const [wishListedBooks, setWishListedBooks] = useState<BookModel[]>([]);
  const { currentUser, userData } = useUserContext();

  useEffect(() => {
    async function getBooksFromDB() {
      if (userData) {
        const books = await BookAPI.getBooksFromReference(userData.wishListRef);
        setWishListedBooks(books);
      }
    }
    getBooksFromDB();
  }, [userData]);

  return (
    <Container>
      <Typography
        sx={{
          mt: 5,
        }}
        variant="h2"
        component="h2"
      >
        WishList
      </Typography>
      <Box
        sx={{
          mt: 5,
          display: "grid",
          gap: 5,
          gridTemplateColumns: "1fr 1fr 1fr",
        }}
      >
        {!!wishListedBooks.length &&
          userData &&
          wishListedBooks.map((book) => (
            <WishListBook key={book.id} book={book} user={userData} />
          ))}
      </Box>
    </Container>
  );
};

export default WishListPage;
