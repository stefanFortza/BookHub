import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import { BookModel } from "../../../api/models/book.model";
import { useUserContext } from "../../../utils/utils";
import {
  Box,
  Card,
  CardContent,
  Grid,
  Paper,
  Typography,
  styled,
} from "@mui/material";
import AddToWishList from "./components/addToWishList.component";
import AddToCart from "./components/addToCart.component";
import BookPageHeader from "./components/bookPageHeader.component";
import BookData from "./components/bookData.component";

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

const ShowBookPageHeader: FunctionComponent<BookPageDataProps> = ({ book }) => {
  const navigate = useNavigate();
  const { userData } = useUserContext();
  const { price, id, imageURLL } = book;

  console.log("yes");

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
                    <BookPageHeader book={book} />
                  </Grid>

                  <Grid xs={6} item>
                    <Item>
                      <BookData book={book} />
                    </Item>
                  </Grid>

                  <Grid xs={6} item>
                    <Item>
                      <Typography sx={{ fontSize: 20, textAlign: "left" }}>
                        Price: {price + 0.99} lei
                      </Typography>

                      <AddToCart />

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

export default ShowBookPageHeader;
