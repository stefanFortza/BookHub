import { DocumentReference } from "firebase/firestore";
import { UserModel } from "./user.model";
import { CommentModel } from "./coment.model";

export interface IBook {
  title: string;
  author: string;
  yearOfPublication: string;
  publisher: string;
  imageURLS: string;
  imageURLM: string;
  imageURLL: string;
  price: number;
  description: string;
}
export interface BookModel extends IBook {
  id: string;
  // rating?: number;
  userRef: DocumentReference<UserModel>;
  commentsRef: DocumentReference<CommentModel>[];
}
