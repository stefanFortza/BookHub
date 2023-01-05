import { FunctionComponent, useEffect, useState } from "react";
import { BookModel } from "../../../api/models/book.model";
import {
  Box,
  Button,
  Checkbox,
  List,
  ListItem,
  ListItemText,
  Paper,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import FiltersSearch from "./components/filtersSearch.component";
import fuzzysort from "fuzzysort";

interface FiltersProps {
  setAuthorsChecked: React.Dispatch<React.SetStateAction<string[]>>;
  authorsChecked: string[];
  handleToggle: (value: string) => () => void;
  books: BookModel[];
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Filters: FunctionComponent<FiltersProps> = ({
  setAuthorsChecked,
  handleToggle,
  authorsChecked,
  books,
}) => {
  const [uniqueAuthors, setUniqueAuthors] = useState<string[]>([]);
  const [filteredAuthors, setFilteredAuthors] = useState<string[]>([]);
  const [searchField, setSearchField] = useState("");

  useEffect(() => {
    const authors = books
      .map((book) => book.author)
      .filter((author, index, self) => self.indexOf(author) === index);

    setUniqueAuthors(authors);
  }, [books]);

  useEffect(() => {
    if (!searchField.length) {
      setFilteredAuthors(uniqueAuthors);
    } else {
      // const newFilteredAuthors = uniqueAuthors.filter((author) =>
      //   author.toLowerCase().includes(searchField.toLowerCase())
      // );
      const newFilteredAuthors = fuzzysort
        .go(searchField, uniqueAuthors)
        .map((res) => res.target);

      setFilteredAuthors(newFilteredAuthors);
    }
  }, [searchField, uniqueAuthors]);

  return (
    <Box>
      <Typography variant="body1" gutterBottom sx={{ fontSize: "2rem" }}>
        Authors
      </Typography>
      <Item sx={{ mb: 3, backgroundColor: "#1A2027" }}>
        <Button
          onClick={(e) => {
            setAuthorsChecked([]);
          }}
          sx={{ width: "100%" }}
        >
          Reset Filters
        </Button>
      </Item>

      <FiltersSearch
        searchField={searchField}
        setSearchField={setSearchField}
      />

      <List
        sx={{
          width: "100%",
          maxWidth: 360,
          bgcolor: "background.paper",
          position: "relative",
          overflow: "auto",
          maxHeight: 500,
          "& ul": { padding: 0 },
        }}
        subheader={<li />}
      >
        {filteredAuthors.map((author, idx) => (
          <ListItem
            key={idx}
            secondaryAction={
              <Checkbox
                edge="end"
                onChange={handleToggle(author)}
                checked={authorsChecked.indexOf(author) !== -1}
                // inputProps={{ "aria-labelledby": labelId }}
              />
            }
          >
            <ListItemText primary={author} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Filters;
