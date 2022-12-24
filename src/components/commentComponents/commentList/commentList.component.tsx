import { FunctionComponent, useEffect, useState } from "react";
import { BookModel } from "../../../api/models/book.model";
import CommentComponent from "../commentComponent/commentComponent.component";
import { CommentModel } from "../../../api/models/coment.model";
import { getAllComments } from "../../../api/CommentAPI";
import { LoaderFunctionArgs } from "react-router-dom";

interface CommentListProps {
  currentBook: BookModel;
}

const CommentList: FunctionComponent<CommentListProps> = ({ currentBook }) => {
  const { id } = currentBook;
  const [comments, setComments] = useState<CommentModel[]>([]);

  useEffect(() => {
    getAllComments(id).then((comm) => setComments(comm));
  }, []);

  return (
    <div>
      {comments.length &&
        comments.map((comment) => (
          <CommentComponent key={comment.id} comment={comment} />
        ))}
    </div>
  );
};

export default CommentList;
