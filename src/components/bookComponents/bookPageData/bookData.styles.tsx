import { Chip, ChipProps, Typography, TypographyProps } from "@mui/material";
import { FunctionComponent, PropsWithChildren } from "react";
import styled from "styled-components";

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

export const BookDataChip: FunctionComponent<ChipProps> = ({ ...props }) => (
  <Chip sx={{ ml: 1, fontSize: 20, fontWeight: 300 }} color="info" {...props} />
);
