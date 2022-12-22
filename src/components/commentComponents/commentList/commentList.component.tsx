import { useLiveQuery } from "dexie-react-hooks";
import { FunctionComponent } from "react";
import { BookModel } from "../../../api/models/book.model";
import { useAPI } from "../../../utils/hooks";
import CommentComponent from "../commentComponent/commentComponent.component";

interface CommentListProps {
  currentBook: BookModel;
}

const CommentList: FunctionComponent<CommentListProps> = ({ currentBook }) => {
  const { id } = currentBook;
  const { CommentsAPI } = useAPI();
  const commentsAndUsers = useLiveQuery(async () => {
    const comments = await CommentsAPI.getAll({ bookId: id });
    if (comments) {
      return CommentsAPI.joinWithUsers(comments);
    }

    return;
  });

  return (
    <div>
      {commentsAndUsers &&
        commentsAndUsers.map(({ comment, user }, i) => (
          <CommentComponent key={comment.id} comment={comment} user={user} />
        ))}
    </div>
  );
};

export default CommentList;
