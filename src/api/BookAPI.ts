import {
  CollectionReference,
  DocumentReference,
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  setDoc,
  startAt,
  updateDoc,
} from "firebase/firestore";
import { BookModel } from "./models/book.model";
import { db } from "../utils/firebase";
import { uuidv4 } from "@firebase/util";

export async function addBook(book: BookModel) {
  const id = uuidv4();
  await setDoc(doc(db, "books", id), {
    ...book,
    id,
  });
}

export async function getBook(id: string) {
  const docRef = doc(db, "books", id) as DocumentReference<BookModel>;
  const docSnap = await getDoc(docRef);
  return docSnap.data();
}

export async function getAllBooks() {
  const col = collection(db, "books") as CollectionReference<BookModel>;
  const snapshot = await getDocs(col);
  const books: BookModel[] = [];
  snapshot.forEach((book) => {
    books.push({ ...book.data() });
  });
  return books;
}

export async function getBooks(start: number) {
  const col = query(
    collection(db, "books") as CollectionReference<BookModel>,
    limit(start)
  );
  const snapshot = await getDocs(col);
  const books: BookModel[] = [];
  snapshot.forEach((book) => {
    books.push({ ...book.data() });
  });
  return books;
}
