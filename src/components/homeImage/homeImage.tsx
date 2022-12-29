import { Card, CardMedia, CardMediaProps } from "@mui/material";
import { FunctionComponent } from "react";
import { Link } from "react-router-dom";

interface props extends CardMediaProps<"img"> {
  title: string;
  image: string;
  to: string;
}
const HomeImage: FunctionComponent<props> = ({
  title,
  to,
  image,
  ...props
}) => {
  return (
    <Card>
      <div style={{ position: "relative" }}>
        <Link to={to}>
          <CardMedia
            {...props}
            component="img"
            image={image}
            title="Pancakes"
            alt="Pancakes"
          />
          <div
            style={{
              position: "absolute",
              color: "white",
              top: "50%",
              left: "50%",
              transform: "translateX(-50%)",
              fontSize: "3rem",
              fontWeight: "bold",
            }}
          >
            {title}
          </div>
        </Link>
      </div>
    </Card>
  );
};

export default HomeImage;
