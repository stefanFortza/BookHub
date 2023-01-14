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
import { useNavigate, useSearchParams } from "react-router-dom";

interface FiltersProps {
  authorsChecked: string[];
  setAuthorsChecked: React.Dispatch<React.SetStateAction<string[]>>;
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Filters: FunctionComponent<FiltersProps> = ({
  authorsChecked,
  setAuthorsChecked,
}) => {
  const [uniqueAuthors, setUniqueAuthors] = useState<
    { author: string; bookCount: number }[]
  >([]);
  const [filteredAuthors, setFilteredAuthors] = useState<
    { author: string; bookCount: number }[]
  >([]);
  const [searchField, setSearchField] = useState("");
  let [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  //when the component mounts it updates unique authors
  useEffect(() => {
    BookAPI.getAuthors().then((authorsData) => {
      if (authorsData) {
        setUniqueAuthors(authorsData.authors);
      }
    });

    setAuthorsChecked(searchParams.getAll("authors"));
  }, []);

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
    // newFilteredAuthors.unshift(...authorsChecked);

    setFilteredAuthors(newFilteredAuthors.slice(0, 7));
  }, [searchField, uniqueAuthors]);

  const handleToggle = (value: { author: string; bookCount: number }) => {
    const currentIndex = authorsChecked.findIndex(
      (authChek) => authChek === value.author
    );
    const newChecked = [...authorsChecked];

    if (currentIndex === -1) {
      newChecked.push(value.author);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setAuthorsChecked(newChecked);
    console.log(authorsChecked);
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
          Reset Filters ({authorsChecked.length})
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
                onClick={() => handleToggle(author)}
                checked={
                  authorsChecked.findIndex((x) => x === author.author) !== -1
                }
              />
            }
          >
            <ListItemText primary={`${author.author} (${author.bookCount})`} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Filters;
