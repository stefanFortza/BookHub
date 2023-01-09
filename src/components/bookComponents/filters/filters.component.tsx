import { FunctionComponent, useCallback, useEffect, useState } from "react";
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
import { BookAPI } from "../../../api/BookAPI";

interface FiltersProps {
  handleApplyFilters: (
    checkedAuthors: { author: string; bookCount: number }[]
  ) => void;
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
  books,
  handleApplyFilters,
}) => {
  const [uniqueAuthors, setUniqueAuthors] = useState<
    { author: string; bookCount: number }[]
  >([]);
  const [authorsChecked, setAuthorsChecked] = useState<
    { author: string; bookCount: number }[]
  >([]);
  const [filteredAuthors, setFilteredAuthors] = useState<
    { author: string; bookCount: number }[]
  >([]);
  const [searchField, setSearchField] = useState("");

  //when the component updates it updates unique authors
  useEffect(() => {
    BookAPI.getAuthors().then((authorsData) => {
      if (authorsData) {
        setUniqueAuthors(authorsData.authors);
      }
    });
  }, [books]);

  // when the search field changes it updates the filtered authors
  useEffect(() => {
    let newFilteredAuthors: { author: string; bookCount: number }[] = [];

    if (!searchField.length) {
      newFilteredAuthors = [...uniqueAuthors];
    } else {
      newFilteredAuthors = fuzzysort
        .go(searchField, uniqueAuthors, { key: "author" })
        .map((res) => res.obj);
    }
    // console.log(newFilteredAuthors);

    setFilteredAuthors(newFilteredAuthors.slice(0, 7));
  }, [searchField, uniqueAuthors]);

  const handleToggle = (value: { author: string; bookCount: number }) => {
    const currentIndex = authorsChecked.findIndex(
      (authChek) => authChek.author === value.author
    );
    const newChecked = [...authorsChecked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setAuthorsChecked(newChecked);
    console.log(authorsChecked);
  };

  const handleApply = () => {
    handleApplyFilters(authorsChecked);
  };

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

      <Item sx={{ mb: 3, backgroundColor: "#1A2027" }}>
        <Button onClick={handleApply} sx={{ width: "100%" }}>
          Apply filters ({authorsChecked.length})
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
        {filteredAuthors.map((author, idx) => {
          return (
            <ListItem
              key={idx}
              secondaryAction={
                <Checkbox
                  edge="end"
                  onClick={() => handleToggle(author)}
                  checked={
                    authorsChecked.findIndex(
                      (x) => x.author === author.author
                    ) !== -1
                  }
                />
              }
            >
              <ListItemText
                primary={`${author.author} (${author.bookCount})`}
              />
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};

export default Filters;
