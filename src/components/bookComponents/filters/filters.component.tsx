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
import { BookAPI } from "../../../api/BookAPI";

interface FiltersProps {
  handleCheckedAuthors: (authors: string[]) => void;
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
  handleCheckedAuthors,
}) => {
  const [uniqueAuthors, setUniqueAuthors] = useState<string[]>([]);
  const [filteredAuthors, setFilteredAuthors] = useState<string[]>([]);
  const [authorsChecked, setAuthorsChecked] = useState<string[]>([]);
  const [searchField, setSearchField] = useState("");

  //when the component updates it updates unique authors
  useEffect(() => {
    // const authors = books
    //   .map((book) => book.author)
    //   .filter((author, index, self) => self.indexOf(author) === index);
    BookAPI.getAuthors().then((authorsData) => {
      if (authorsData) {
        const authors = authorsData.map((data) => data.author);

        setUniqueAuthors(authors);
      }
    });
  }, [books]);

  // when the search field changes it updates the filtered authors
  useEffect(() => {
    let newFilteredAuthors: string[] = [];

    if (!searchField.length) {
      newFilteredAuthors = [...uniqueAuthors];
    } else {
      newFilteredAuthors = fuzzysort
        .go(searchField, uniqueAuthors)
        .map((res) => res.target);
    }

    setFilteredAuthors(newFilteredAuthors);
  }, [searchField, uniqueAuthors]);

  // when authors checked change we pass data to parent
  useEffect(() => {
    handleCheckedAuthors(authorsChecked);
  }, [authorsChecked]);

  const handleToggle = (value: string) => () => {
    const currentIndex = authorsChecked.indexOf(value);
    const newChecked = [...authorsChecked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setAuthorsChecked(newChecked);
    // console.log(authorsChecked);
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
        <Button
          // onClick={() => BookAPI.addAuthor("ddasasd")}
          sx={{ width: "100%" }}
        >
          Authors
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
