import { Box } from "@mui/material";
import { FunctionComponent } from "react";
import { BookDataProp } from "./bookDaraProp.component";
import { BookDataChip } from "./bookDataChip.component";
import { BookModel } from "../../../../api/models/book.model";

interface BookDataProps {
  book: BookModel;
}

const BookData: FunctionComponent<BookDataProps> = ({ book }) => {
  const { yearOfPublication, publisher, isbn } = book;

  return (
    <Box>
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
    </Box>
  );
};

export default BookData;
