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
  startAt,
  orderBy,
  startAfter,
  QueryConstraint,
  getCountFromServer,
  QueryDocumentSnapshot,
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

  export async function getBooksPaginated(
    authors: string[] = [],
    category: string,
    startAtBook?: QueryDocumentSnapshot<BookModel>
  ): Promise<{
    books: BookModel[];
    count: number;
    lastBook: QueryDocumentSnapshot<BookModel>;
    firstBook: QueryDocumentSnapshot<BookModel>;
  }> {
    const booksCollection = collection(
      db,
      "books"
    ) as CollectionReference<BookModel>;
    const queryConstraints: QueryConstraint[] = [orderBy("id", "asc")];
    if (authors.length) {
      queryConstraints.push(where("author", "in", authors));
    }
    if (category.length) {
      queryConstraints.push(where("category", "==", category));
    }

    const snap = await getCountFromServer(
      query(booksCollection, ...queryConstraints)
    );
    const count = snap.data().count;
    console.log(count);
    queryConstraints.push(limit(8));

    if (startAtBook) {
      queryConstraints.push(startAt(startAtBook));
    }
    const q = query(booksCollection, ...queryConstraints);

    const snapshot = await getDocs(q);
    const books: BookModel[] = [];
    const lastBook = snapshot.docs[snapshot.docs.length - 1];
    const firstBook = snapshot.docs[0];

    snapshot.forEach((book) => {
      books.push({ ...book.data() });
    });
    return { books, count, lastBook, firstBook };
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
