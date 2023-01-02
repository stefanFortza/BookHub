import { Button } from "@mui/material";
import { FunctionComponent, useEffect, useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { BookModel } from "../../../api/models/book.model";
import { getUserData, getUserDocRef } from "../../../api/AuthAPI";
import {
  addBookToWishList,
  removeBookFromWishList,
} from "../../../api/BookAPI";
import { useUserContext } from "../../../utils/utils";
import { UserModel } from "../../../api/models/user.model";

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
    await addBookToWishList(book.id, user.id);
  };

  const removeFromWishList = async () => {
    setIsAdded(!isAdded);
    await removeBookFromWishList(book.id, user.id);
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
