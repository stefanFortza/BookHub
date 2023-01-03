import {
  DocumentReference,
  arrayUnion,
  doc,
  getDoc,
  increment,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../utils/firebase";
import { CommentModel, IComment } from "./models/coment.model";
import { uuidv4 } from "@firebase/util";
import { BookModel } from "./models/book.model";
import { BookAPI } from "./BookAPI";
import { AuthAPI } from "./AuthAPI";

export namespace CommentAPI {
  export async function addComment(
    comment: IComment,
    book: BookModel,
    userId: string
  ) {
    const id = uuidv4();
    const bookRef = BookAPI.getBookDocRef(book.id);
    const commentRef = getCommentDocRef(id);
    const userRef = AuthAPI.getUserDocRef(userId);

    const newRating =
      (book.ratingAvg * book.ratingCount + comment.rating) /
      (book.ratingCount + 1);

    await updateDoc(bookRef, {
      commentsRef: arrayUnion(commentRef),
      ratingAvg: newRating,
      ratingCount: increment(1),
    });

    await setDoc(commentRef, { ...comment, id, userRef });
  }

  export async function getComment(commentId: string) {
    const docRef = getCommentDocRef(commentId);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
  }

  export async function getAllComments(
    bookId: string
  ): Promise<CommentModel[]> {
    const bookRef = BookAPI.getBookDocRef(bookId);
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
}
