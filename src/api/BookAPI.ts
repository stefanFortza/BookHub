import {
  CollectionReference,
  DocumentReference,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  setDoc,
  updateDoc,
  arrayRemove,
  where,
  WriteBatch,
} from "firebase/firestore";
import { BookModel, IBook } from "./models/book.model";
import { db } from "../utils/firebase";
import { uuidv4 } from "@firebase/util";
import { AuthAPI } from "./AuthAPI";

export namespace BookAPI {
  export interface AuthorsType {
    authors: { author: string; bookCount: number }[];
  }

  export async function getBook(id: string) {
    const docRef = doc(db, "books", id) as DocumentReference<BookModel>;
    const docSnap = await getDoc(docRef);
    return docSnap.data();
  }

  export function getBookDocRef(bookId: string): DocumentReference<BookModel> {
    return doc(db, "books", bookId) as DocumentReference<BookModel>;
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

  export async function getFilteredBooks(authors: string[]) {
    if (!authors.length) return [];

    const col = query(
      collection(db, "books") as CollectionReference<BookModel>,
      where("author", "in", authors)
    );

    const snapshot = await getDocs(col);
    const books: BookModel[] = [];
    snapshot.forEach((book) => {
      books.push({ ...book.data() });
    });
    return books;
  }

  export async function getAuthors() {
    const authorsRef = doc(
      db,
      "authors",
      "authors"
    ) as DocumentReference<AuthorsType>;

    const authorsSnapshot = await getDoc(authorsRef);

    return authorsSnapshot.data();
  }

  export async function addBookToWishList(bookId: string, userId: string) {
    const bookRef = getBookDocRef(bookId);
    const userRef = AuthAPI.getUserDocRef(userId);
    const user = await AuthAPI.getUserData(userRef);

    if (user) {
      user.wishListRef.forEach((book) => {
        if (book.id === bookId) {
          return;
        }
      });

      await updateDoc(userRef, {
        wishListRef: arrayUnion(bookRef),
      });
    }
  }

  export async function removeBookFromWishList(bookId: string, userId: string) {
    const bookRef = getBookDocRef(bookId);
    const userRef = AuthAPI.getUserDocRef(userId);
    const user = await AuthAPI.getUserData(userRef);

    if (user) {
      for (let i = 0; i < user.wishListRef.length; i++) {
        const book = user.wishListRef[i];

        if (book.id === bookId) {
          await updateDoc(userRef, {
            wishListRef: arrayRemove(bookRef),
          });
        }
      }
    }
  }
}
