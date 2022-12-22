import { FunctionComponent } from "react";

interface FiltersProps {
  setFilters: React.Dispatch<React.SetStateAction<string>>;
}

const Filters: FunctionComponent<FiltersProps> = ({ setFilters }) => {
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
        {/* {books &&
          books
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
            ))} */}
      </div>
    </>
  );
};

export default Filters;
