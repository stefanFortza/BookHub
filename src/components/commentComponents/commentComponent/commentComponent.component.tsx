import { FunctionComponent, useEffect, useMemo, useState } from "react";
import { CommentModel } from "../../../api/models/coment.model";
import { UserModel } from "../../../api/models/user.model";
import { getUserData } from "../../../api/AuthAPI";

interface CommentProps {
  comment: CommentModel;
}

const CommentComponent: FunctionComponent<CommentProps> = ({ comment }) => {
  const [user, setUser] = useState<UserModel | undefined>(undefined);

  let ratingJSX: JSX.Element[] = useMemo(() => {
    let mut: JSX.Element[] = [];
    for (let i = 0; i < comment.rating; i++) {
      mut.push(<i key={i} className="bi bi-star-fill"></i>);
    }
    for (let i = comment.rating; i < 5; i++) {
      mut.push(<i key={i} className="bi bi-star"></i>);
    }
    return mut;
  }, [comment.rating]);

  useEffect(() => {
    getUserData(comment.userRef).then((user) => setUser(user));
  }, []);

  return (
    <div>
      <h2>{user ? user.displayName : ""}</h2>
      <div>{comment.comment}</div>
      {ratingJSX}
    </div>
  );
};

export default CommentComponent;
