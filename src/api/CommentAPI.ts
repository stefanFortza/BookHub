import {
  CollectionReference,
  DocumentReference,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { BookModel } from "./models/book.model";
import { db } from "../utils/firebase";
import { CommentModel, IComment } from "./models/coment.model";
import { uuidv4 } from "@firebase/util";
import { UserModel } from "./models/user.model";

export async function addComment(
  comment: IComment,
  bookId: string,
  userId: string
) {
  const id = uuidv4();
  const bookRef = doc(db, "books", bookId) as DocumentReference<BookModel>;
  const commentRef = doc(db, "comments", id) as DocumentReference<CommentModel>;
  const userRef = doc(db, "users", userId) as DocumentReference<UserModel>;

  await setDoc<CommentModel>(commentRef, { ...comment, id, bookRef, userRef });
}

export async function getComment(id: string) {
  const docRef = doc(db, "comments", id) as DocumentReference<CommentModel>;
  const docSnap = await getDoc(docRef);
  return docSnap.data();
}

export async function getAllComments() {
  const col = collection(db, "books") as CollectionReference<BookModel>;
  const snapshot = await getDocs(col);
  const books: BookModel[] = [];
  snapshot.forEach((book) => {
    books.push({ ...book.data(), id: book.id });
  });
  return books;
}
