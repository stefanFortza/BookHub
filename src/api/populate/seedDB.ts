import { collection, getCountFromServer, getDocs } from "firebase/firestore";
import { addBook } from "../BookAPI";
import { BookModel } from "../models/book.model";
import data from "./BX-MostPopular.json";
import { db } from "../../utils/firebase";
import { getAuth } from "firebase/auth";

export const seedDB = async () => {
  const auth = getAuth();
  for (let i = 0; i < 100; i++) {
    const book = (data as any)[i];
    const bookToAdd: BookModel = {
      ...book,
      description: "",
      price: 1,
      userId: auth.currentUser?.uid || 1,
    };
    // console.log(bookToAdd);
    addBook(bookToAdd);
  }
};

export const bookCount = async () => {
  const coll = collection(db, "books");
  const snap = await getCountFromServer(coll);
  const docs = await getDocs(coll);
  console.log(snap.data().count);
  let count = 0;
  docs.forEach(() => count++);
  console.log(count);
};
