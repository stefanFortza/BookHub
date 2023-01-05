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
  interface AuthorsDataType {
    uniqueAuthors: { author: string; books: number }[];
  }

  export async function addBook(book: IBook, userId: string) {
    const id = uuidv4();

    await addAuthor(book.author);

    await setDoc<BookModel>(
      doc(db, "books", id) as DocumentReference<BookModel>,
      {
        ...book,
        id,
        commentsRef: [],
      }
    );
  }

  export async function addAuthor(author: string) {
    const authorsRef = doc(
      db,
      "books",
      "authors"
    ) as DocumentReference<AuthorsDataType>;
    const authorsSnap = await getDoc<AuthorsDataType>(authorsRef);

    if (authorsSnap.exists()) {
      const { uniqueAuthors } = authorsSnap.data();
      const indexAuthor = containsAuthor(uniqueAuthors, author);

      if (indexAuthor === -1) {
        await updateDoc(authorsRef, {
          uniqueAuthors: arrayUnion({ author, books: 1 }),
        });
      } else {
        await updateDoc(authorsRef, {
          uniqueAuthors: arrayUnion({
            author,
            books: uniqueAuthors[indexAuthor].books + 1,
          }),
        });
      }
    } else {
      await setDoc(authorsRef, {
        uniqueAuthors: [{ author, books: 1 }],
      });
    }
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
      // limit(start)
      where("__name__", "!=", "authors")
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
      "books",
      "authors"
    ) as DocumentReference<AuthorsDataType>;

    const authorsSnapshot = await getDoc(authorsRef);

    return authorsSnapshot.data()?.uniqueAuthors;
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

  function containsAuthor(
    authorsData: AuthorsDataType["uniqueAuthors"],
    author: string
  ) {
    for (let i = 0; i < authorsData.length; i++) {
      const { author: dbAuthor } = authorsData[i];

      if (dbAuthor.toLowerCase() === author.toLowerCase()) {
        return i;
      }
    }

    return -1;
  }
}
