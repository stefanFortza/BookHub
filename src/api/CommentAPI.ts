import {
  CollectionReference,
  DocumentReference,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { BookModel } from "./models/book.model";
import { db } from "../utils/firebase";
import { CommentModel, IComment } from "./models/coment.model";
import { uuidv4 } from "@firebase/util";
import { getBookDocRef } from "./BookAPI";
import { getUserDocRef } from "./AuthAPI";

export async function addComment(
  comment: IComment,
  bookId: string,
  userId: string
) {
  const id = uuidv4();
  const bookRef = getBookDocRef(bookId);
  const commentRef = getCommentDocRef(id);
  const userRef = getUserDocRef(userId);

  await updateDoc(bookRef, {
    commentsRef: arrayUnion(commentRef),
  });

  await setDoc(commentRef, { ...comment, id, userRef });
}

export async function getComment(commentId: string) {
  const docRef = getCommentDocRef(commentId);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
}

export async function getAllComments(bookId: string): Promise<CommentModel[]> {
  const bookRef = getBookDocRef(bookId);
  const bookSnap = await getDoc(bookRef);
  const book = bookSnap.data();

  if (!book) return [];

  let comments: CommentModel[] = [];
  for (const comment of book.commentsRef) {
    const comSnap = await getDoc(comment);
    const data = comSnap.data();
    if (data) {
      comments.push(data);
    }
  }

  return comments;
}

export function getCommentDocRef(
  commentId: string
): DocumentReference<CommentModel> {
  return doc(db, "comments", commentId) as DocumentReference<CommentModel>;
}
