import { db } from "../api/database/db";
import { CommentModel } from "../api/models/coment.model";
import { UserModel } from "../api/models/user.model";

export async function joinCommentsWithUsers(comments: CommentModel[]) {
  let commentsAndUsers: { comment: CommentModel; user: UserModel }[] = [];

  for (const comment of comments) {
    const user = (await db.users
      .where("id")
      .equals(comment.userId)
      .first()) as UserModel;
    commentsAndUsers.push({ comment, user });
  }
  return commentsAndUsers;
}
