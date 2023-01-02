import { FunctionComponent, useEffect, useState } from "react";
import { BookModel } from "../../../api/models/book.model";
import CommentComponent from "../commentComponent/commentComponent.component";
import { CommentModel } from "../../../api/models/coment.model";
import { getAllComments } from "../../../api/CommentAPI";
import { Box } from "@mui/material";

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
    <Box sx={{ mt: 3 }}>
      {!!comments.length &&
        comments.map((comment) => (
          <CommentComponent key={comment.id} comment={comment} />
        ))}
    </Box>
  );
};

export default CommentList;
