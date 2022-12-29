import { FunctionComponent } from "react";
import { BookModel } from "../../../api/models/book.model";
import { Paper, Stack, styled } from "@mui/material";

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
    <div>
      <h1>Filters</h1>
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
    </div>
  );
};

export default Filters;
