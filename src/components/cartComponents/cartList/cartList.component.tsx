import { FunctionComponent } from "react";
import { CartItemModel } from "../../../api/models/cartItem.model";
import { Box } from "@mui/material";
import CartItem from "../cartItem.component";

interface CartListProps {
  cartItems: CartItemModel[];
}

const CartList: FunctionComponent<CartListProps> = ({ cartItems }) => {
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {cartItems.map((cartItem, idx) => (
        <CartItem key={idx} cartItem={cartItem} />
      ))}
    </Box>
  );
};

export default CartList;
