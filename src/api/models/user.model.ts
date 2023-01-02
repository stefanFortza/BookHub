import { DocumentReference } from "firebase/firestore";
import { BookModel } from "./book.model";

export interface IUser {
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

export interface UserModel extends IUser {
  id: string;
  wishListRef: DocumentReference<BookModel>[];
}
