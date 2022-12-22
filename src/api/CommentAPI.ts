import {
  CollectionReference,
  DocumentReference,
  Firestore,
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  setDoc,
} from "firebase/firestore";
import { BookModel } from "./models/book.model";
import { db } from "../utils/firebase";
import { CommentModel } from "./models/coment.model";

export async function addComment(comment: CommentModel) {
  await addDoc(collection(db, "comments"), { ...comment });
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
