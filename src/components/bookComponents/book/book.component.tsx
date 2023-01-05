import { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { BookModel } from "../../../api/models/book.model";
import {
  Card,
  CardContent,
  CardMedia,
  CardProps,
  Typography,
} from "@mui/material";

interface BookProps extends CardProps {
  book: BookModel;
}

const Book: FunctionComponent<BookProps> = ({ book, ...other }) => {
  const { title, price, imageURLL } = book;

  return (
    <Card {...other}>
      <Link to={`/books/show/${book.id}`}>
        <CardMedia
          component="img"
          height=""
          image={imageURLL}
          sx={{
            height: "300px",
          }}
        />
      </Link>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {price ? price.toFixed(2) : "mama"} RON
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Book;
