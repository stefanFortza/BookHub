import { ChipProps, Chip } from "@mui/material";
import { FunctionComponent } from "react";

export const BookDataChip: FunctionComponent<ChipProps> = ({ ...props }) => (
  <Chip sx={{ ml: 1, fontSize: 20, fontWeight: 300 }} color="info" {...props} />
);
