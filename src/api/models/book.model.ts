import { DocumentReference } from "firebase/firestore";
import { UserModel } from "./user.model";
import { CommentModel } from "./coment.model";

export interface IBook {
  isbn: string;
  title: string;
  author: string;
  yearOfPublication: string;
  publisher: string;
  imageURLS: string;
  imageURLM: string;
  imageURLL: string;
  price: number;
  description: string;
  ratingCount: number;
  ratingAvg: number;
  category: string;
}
export interface BookModel extends IBook {
  id: string;
  commentsRef: DocumentReference<CommentModel>[];
}
