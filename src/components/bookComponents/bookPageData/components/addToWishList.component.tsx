import { Button } from "@mui/material";
import { FunctionComponent, useEffect, useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { BookModel } from "../../../../api/models/book.model";
import { UserModel } from "../../../../api/models/user.model";
import { BookAPI } from "../../../../api/BookAPI";

interface AddToWishListProps {
  book: BookModel;
  user: UserModel;
}

const AddToWishList: FunctionComponent<AddToWishListProps> = ({
  book,
  user,
}) => {
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    if (user.wishListRef.find((userBook) => userBook.id === book.id)) {
      setIsAdded(true);
    }
  }, []);

  const addToWishList = async () => {
    setIsAdded(!isAdded);
    await BookAPI.addBookToWishList(book.id, user.id);
  };

  const removeFromWishList = async () => {
    setIsAdded(!isAdded);
    await BookAPI.removeBookFromWishList(book.id, user.id);
  };

  if (isAdded)
    return (
      <Button
        variant="text"
        className="mt-3 mx-3"
        style={{ width: "80%" }}
        onClick={removeFromWishList}
      >
        <FavoriteIcon /> Remove from wishlist
      </Button>
    );
  else
    return (
      <Button
        variant="text"
        className="mt-3 mx-3"
        style={{ width: "80%" }}
        onClick={addToWishList}
      >
        <FavoriteBorderIcon /> Add to wishlist
      </Button>
    );
};

export default AddToWishList;
