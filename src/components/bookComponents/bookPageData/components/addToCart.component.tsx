import { Button, ButtonProps } from "@mui/material";
import { FunctionComponent } from "react";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

interface AddToCartProps extends ButtonProps {}

const AddToCart: FunctionComponent<AddToCartProps> = ({ ...props }) => {
  return (
    <Button
      variant="contained"
      className="mt-3 mx-3"
      style={{ width: "80%" }}
      {...props}
    >
      <AddShoppingCartIcon /> Add to cart
    </Button>
  );
};

export default AddToCart;
