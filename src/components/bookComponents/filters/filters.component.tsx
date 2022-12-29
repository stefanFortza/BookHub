import { FunctionComponent } from "react";
import { BookModel } from "../../../api/models/book.model";
import { Box, Paper, Stack, Typography, styled } from "@mui/material";

interface FiltersProps {
  setFilters: React.Dispatch<React.SetStateAction<string>>;
  books: BookModel[];
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Filters: FunctionComponent<FiltersProps> = ({ setFilters, books }) => {
  return (
    <Box>
      <Typography variant="body1" gutterBottom sx={{ fontSize: "2rem" }}>
        Authors
      </Typography>
      <div
        onClick={(e) => {
          setFilters(e.currentTarget.innerText.toLowerCase());
        }}
      >
        all
      </div>
      <Stack spacing={2}>
        {/* TODO clear code */}
        {books
          .map((book) => book.author)
          .filter((value, index, self) => self.indexOf(value) === index)
          .map((author) => (
            <Item
              key={author}
              onClick={(e) => {
                setFilters(e.currentTarget.innerText.toLowerCase());
              }}
            >
              {author}
            </Item>
          ))}
      </Stack>
    </Box>
  );
};

export default Filters;
