import { Container, Typography } from "@mui/material";
import { FunctionComponent } from "react";
import { useParams } from "react-router-dom";
import { capitalizeFirstLetter } from "../../utils/utils";
import BookList from "../../components/bookComponents/booklist/booklist.component";

interface CategoryBookPageProps {}

const CategoryBookPage: FunctionComponent<CategoryBookPageProps> = () => {
  const { category } = useParams();
  return (
    <Container>
      <Typography variant="h3" gutterBottom sx={{ mt: 4 }}>
        {capitalizeFirstLetter(category)}
      </Typography>
      <BookList books={[]} />
    </Container>
  );
};

export default CategoryBookPage;
