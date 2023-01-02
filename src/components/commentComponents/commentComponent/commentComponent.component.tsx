import { FunctionComponent, useEffect, useMemo, useState } from "react";
import { CommentModel } from "../../../api/models/coment.model";
import { UserModel } from "../../../api/models/user.model";
import { getUserData } from "../../../api/AuthAPI";
import { Avatar, Box, Paper, Rating, Typography } from "@mui/material";

interface CommentProps {
  comment: CommentModel;
}

const CommentComponent: FunctionComponent<CommentProps> = ({ comment }) => {
  const [user, setUser] = useState<UserModel | undefined>(undefined);

  useEffect(() => {
    getUserData(comment.userRef).then((user) => setUser(user));
  }, []);

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 5, mb: 3 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Avatar alt="Remy Sharp" src={user?.photoURL || ""} sx={{}} />
          <Typography component="h4">{user ? user.displayName : ""}</Typography>
        </Box>
        <Box>
          <Box sx={{ mb: 3 }}>
            <Typography component="h4" sx={{ fontSize: 25 }}>
              {comment.title}
            </Typography>
            <Rating name="read-only" value={comment.rating} max={10} readOnly />
          </Box>
          <div>{comment.comment}</div>
          <Typography component="legend">Rating</Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default CommentComponent;
