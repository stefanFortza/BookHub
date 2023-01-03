import { FunctionComponent } from "react";
import { CartItemModel } from "../../api/models/cartItem.model";
import { Box, Button, Paper, Typography } from "@mui/material";
import { useCartContext } from "../../utils/utils";
import CloseIcon from "@mui/icons-material/Close";

interface CartItemProps {
  cartItem: CartItemModel;
}

const CartItem: FunctionComponent<CartItemProps> = ({ cartItem }) => {
  const { addToCart, removeFromCart, decreaseQty, increaseQty } =
    useCartContext();

  return (
    <Paper sx={{ mb: 4, p: 3, width: "80%" }}>
      <Box sx={{ display: "flex", gap: 3 }}>
        <Box component="img" src={cartItem.imageURLM} />
        <Box>
          <Typography>Name: {cartItem.title}</Typography>
          <Typography>Price: {cartItem.price}</Typography>
          <Typography>Quantity: {cartItem.quantity}</Typography>
          <Typography>
            <Button sx={{ fontSize: 25 }} onClick={() => decreaseQty(cartItem)}>
              &lt;
            </Button>
            <Button sx={{ fontSize: 25 }} onClick={() => increaseQty(cartItem)}>
              &gt;
            </Button>
          </Typography>
        </Box>
        <Button
          onClick={() => removeFromCart(cartItem)}
          color="primary"
          sx={{ mb: "auto", ml: "auto" }}
        >
          <CloseIcon />
        </Button>
      </Box>
    </Paper>
  );
};

export default CartItem;
