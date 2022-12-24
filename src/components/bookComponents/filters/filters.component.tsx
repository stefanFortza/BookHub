import { FunctionComponent } from "react";
import { BookModel } from "../../../api/models/book.model";

interface FiltersProps {
  setFilters: React.Dispatch<React.SetStateAction<string>>;
  books: BookModel[];
}

const Filters: FunctionComponent<FiltersProps> = ({ setFilters, books }) => {
  return (
    <>
      <h1>Filters</h1>
      <div
        onClick={(e) => {
          setFilters(e.currentTarget.innerText.toLowerCase());
        }}
      >
        all
      </div>
      <div>
        {/* TODO clear code */}
        {books
          .map((book) => book.author)
          .filter((value, index, self) => self.indexOf(value) === index)
          .map((author) => (
            <div
              key={author}
              onClick={(e) => {
                setFilters(e.currentTarget.innerText.toLowerCase());
              }}
            >
              {author}
            </div>
          ))}
      </div>
    </>
  );
};

export default Filters;
