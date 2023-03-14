import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { BookModel } from "../../api/models/book.model";
import DeleteIcon from "@mui/icons-material/Delete";
import { UserModel } from "../../api/models/user.model";
import { BookAPI } from "../../api/BookAPI";
import { useNavigate } from "react-router-dom";
import {
  FacebookShareCount,
  FacebookIcon,
  FacebookShareButton,
} from "react-share";
import { Paper } from "@mui/material";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

interface WishListBookProps {
  book: BookModel;
  user: UserModel;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function WishListBook({ book, user }: WishListBookProps) {
  const navigate = useNavigate();

  const handleDelete: React.MouseEventHandler<HTMLButtonElement> = async (
    e
  ) => {
    await BookAPI.removeBookFromWishList(book.id, user.id);
    navigate(0);
  };

  return (
    <Card sx={{ maxWidth: 300, display: "flex", flexDirection: "column" }}>
      <CardHeader
        sx={{ textAlign: "center" }}
        title={book.title}
        subheader={book.author}
      />
      <CardMedia
        component="img"
        sx={{ cursor: "pointer" }}
        onClick={() => navigate(`/books/show/${book.id}`)}
        height="300"
        image={book.imageURLL}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {book.publisher}
        </Typography>
      </CardContent>
      <CardActions disableSpacing sx={{ m: "auto auto 0 auto" }}>
        <Typography>
          Remove from wishlist
          <IconButton aria-label="add to favorites" onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        </Typography>
        <FacebookShareButton
          url={`https://books-app-v2.web.app/books/show/${book.id}`}
        >
          <FacebookIcon />
        </FacebookShareButton>
      </CardActions>
    </Card>
  );
}
