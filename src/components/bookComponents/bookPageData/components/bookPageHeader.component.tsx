import { Box, Typography, Chip, Rating } from "@mui/material";
import { FunctionComponent, useRef } from "react";
import { BookModel } from "../../../../api/models/book.model";
import {
  EmailIcon,
  FacebookIcon,
  FacebookMessengerIcon,
  HatenaIcon,
  InstapaperIcon,
  LineIcon,
  LinkedinIcon,
  LivejournalIcon,
  MailruIcon,
  OKIcon,
  PinterestIcon,
  PocketIcon,
  RedditIcon,
  TelegramIcon,
  TumblrIcon,
  TwitterIcon,
  ViberIcon,
  VKIcon,
  WeiboIcon,
  WhatsappIcon,
  WorkplaceIcon,
  EmailShareButton,
  FacebookShareButton,
  HatenaShareButton,
  InstapaperShareButton,
  LineShareButton,
  LinkedinShareButton,
  LivejournalShareButton,
  MailruShareButton,
  OKShareButton,
  PinterestShareButton,
  PocketShareButton,
  RedditShareButton,
  TelegramShareButton,
  TumblrShareButton,
  TwitterShareButton,
  ViberShareButton,
  VKShareButton,
  WhatsappShareButton,
  WorkplaceShareButton,
} from "react-share";

interface BookPageHeaderProps {
  book: BookModel;
}

const BookPageHeader: FunctionComponent<BookPageHeaderProps> = ({ book }) => {
  const { title, author, ratingAvg, ratingCount } = book;
  // const url = `${location.protocol}//${location.hostname}/books/show/${book.id}`;
  const url = location.href;
  console.log(url);
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Typography
        component="div"
        sx={{ fontSize: 30, textAlign: "left" }}
        color="text.primary"
        gutterBottom
      >
        {title}
      </Typography>
      <Typography
        component="div"
        sx={{ fontSize: 18, textAlign: "left" }}
        color="text.primary"
        gutterBottom
      >
        By:
        <Chip
          sx={{ ml: 1, fontSize: 20, fontWeight: 600 }}
          label={author}
          color="primary"
        />
      </Typography>
      <Box sx={{ alignSelf: "flex-start", textAlign: "left" }}>
        <Typography component="legend">
          Rating: {ratingAvg.toFixed(1)}/10 ({ratingCount} votes)
        </Typography>
        <Rating
          name="half-rating"
          defaultValue={ratingAvg}
          precision={0.1}
          max={10}
          readOnly
        />
      </Box>
      <Box sx={{ alignSelf: "flex-start", textAlign: "left" }}>
        <EmailShareButton url={url}>
          <EmailIcon />
        </EmailShareButton>
        <FacebookShareButton url={url}>
          <FacebookIcon />
        </FacebookShareButton>
        <PinterestShareButton url={url} media={book.imageURLL}>
          <PinterestIcon />
        </PinterestShareButton>
        <RedditShareButton url={url}>
          <RedditIcon />
        </RedditShareButton>
        <TwitterShareButton url={url}>
          <TwitterIcon />
        </TwitterShareButton>
        <WhatsappShareButton url={url}>
          <WhatsappIcon />
        </WhatsappShareButton>
      </Box>
    </Box>
  );
};

export default BookPageHeader;
