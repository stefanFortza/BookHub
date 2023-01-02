import { DocumentReference } from "firebase/firestore";
import { BookModel } from "./book.model";
import { UserModel } from "./user.model";

export interface IComment {
  comment: string;
  rating: number;
  title: string;
}

export interface CommentModel extends IComment {
  id?: string;
  userRef: DocumentReference<UserModel>;
}
