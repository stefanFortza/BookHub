import { Box, Typography, Chip, Rating } from "@mui/material";
import { FunctionComponent } from "react";
import { BookModel } from "../../../../api/models/book.model";

interface BookPageHeaderProps {
  book: BookModel;
}

const BookPageHeader: FunctionComponent<BookPageHeaderProps> = ({ book }) => {
  const { title, author, ratingAvg, ratingCount } = book;

  return (
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
          Rating: {ratingAvg.toFixed(1)}/10 ({ratingCount} votes)
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
  );
};

export default BookPageHeader;
