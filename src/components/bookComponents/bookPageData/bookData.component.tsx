import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import { BookModel } from "../../../api/models/book.model";
import { useUserContext } from "../../../utils/utils";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Grid,
  Paper,
  Rating,
  Typography,
  styled,
} from "@mui/material";
import { BookDataChip, BookDataProp } from "./bookData.styles";
import { getUserDocRef } from "../../../api/AuthAPI";
import {
  addBookToWishList,
  removeBookFromWishList,
} from "../../../api/BookAPI";
import AddToWishList from "../addToWishList/addToWishList.component";

interface BookPageDataProps {
  book: BookModel;
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(3),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const BookData: FunctionComponent<BookPageDataProps> = ({ book }) => {
  const navigate = useNavigate();
  const { currentUser, userData } = useUserContext();
  const {
    title,
    author,
    description,
    price,
    id,
    imageURLL,
    publisher,
    yearOfPublication,
    isbn,
    ratingCount,
    ratingAvg,
  } = book;

  const handleDelete: React.MouseEventHandler<HTMLButtonElement> = async (
    event
  ) => {
    if (book.id) {
      // await API.BooksAPI.delete(book.id);
    }
    navigate("/");
  };

  const handleEdit: React.MouseEventHandler<HTMLButtonElement> = async (
    event
  ) => {
    navigate(`/books/edit/${id}`);
  };

  return (
    <Paper
      sx={{
        backgroundColor: "#1A2027",
        padding: 3,
        textAlign: "center",
        // color: "",
      }}
    >
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid xs={4} item>
            <Box
              component="img"
              sx={{
                height: "auto",
                width: 200,
                // maxHeight: { xs: 233, md: 167 },
                // maxWidth: { xs: 350, md: 250 },
              }}
              src={imageURLL}
            />
          </Grid>
          <Grid xs={8} item>
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid xs={12} item>
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <Typography
                        component="div"
                        sx={{ fontSize: 30, textAlign: "left" }}
                        color="text.primary"
                        gutterBottom
                      >
                        {title}
                      </Typography>
                      <Typography
                        component="div"
                        sx={{ fontSize: 18, textAlign: "left" }}
                        color="text.primary"
                        gutterBottom
                      >
                        By:
                        <Chip
                          sx={{ ml: 1, fontSize: 20, fontWeight: 600 }}
                          label={author}
                          color="primary"
                        />
                      </Typography>
                      <Box sx={{ alignSelf: "flex-start", textAlign: "left" }}>
                        <Typography component="legend">
                          Rating: {ratingAvg.toFixed(1)}/10 ({ratingCount}{" "}
                          votes)
                        </Typography>
                        <Rating
                          name="half-rating"
                          defaultValue={ratingAvg}
                          precision={0.1}
                          max={10}
                          readOnly
                        />
                      </Box>
                    </Box>
                  </Grid>

                  <Grid xs={6} item>
                    <Item>
                      <BookDataProp>
                        Year: <BookDataChip label={yearOfPublication} />
                      </BookDataProp>
                      <BookDataProp>
                        Publisher: <BookDataChip label={publisher} />
                      </BookDataProp>
                      <BookDataProp>
                        Category: <BookDataChip label={publisher} />
                      </BookDataProp>
                      <BookDataProp>
                        ISBN: <BookDataChip label={isbn} />
                      </BookDataProp>
                    </Item>
                  </Grid>
                  <Grid xs={6} item>
                    <Item>
                      <Typography sx={{ fontSize: 20, textAlign: "left" }}>
                        Price: {price + 0.99} lei
                      </Typography>
                      <Button
                        variant="contained"
                        className="mt-3 mx-3"
                        style={{ width: "80%" }}
                      >
                        Add to cart
                      </Button>
                      {userData ? (
                        <AddToWishList book={book} user={userData} />
                      ) : (
                        ""
                      )}
                    </Item>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default BookData;
