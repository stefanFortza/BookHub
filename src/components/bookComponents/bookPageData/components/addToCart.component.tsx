import { Button } from "@mui/material";
import { FunctionComponent } from "react";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

interface AddToCartProps {}

const AddToCart: FunctionComponent<AddToCartProps> = () => {
  return (
    <Button variant="contained" className="mt-3 mx-3" style={{ width: "80%" }}>
      <AddShoppingCartIcon /> Add to cart
    </Button>
  );
};

export default AddToCart;
