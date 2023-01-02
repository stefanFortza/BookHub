import { TypographyProps, Typography } from "@mui/material";
import { FunctionComponent, PropsWithChildren } from "react";

//TODO add chip
export const BookDataProp: FunctionComponent<
  PropsWithChildren<TypographyProps<"div">>
> = ({ children, ...props }) => (
  <Typography
    sx={{ fontSize: 15, textAlign: "left", mb: 0.8 }}
    color="text.secondary"
    variant="h5"
    {...props}
  >
    {children}
  </Typography>
);
