import { Typography } from "@mui/material";
import { Container } from "@mui/system";
import localforage from "localforage";
import { FunctionComponent } from "react";
import { LoaderFunction, defer, useLoaderData } from "react-router-dom";
import CartList from "../../components/cartComponents/cartList/cartList.component";
import { CartItemModel } from "../../api/models/cartItem.model";
import { CartAPI } from "../../api/CartAPI";
import { useCartContext } from "../../utils/utils";

interface CartPageProps {}

export const cartPageLoader: LoaderFunction = async ({ params, request }) => {
  // const cartItemsPromise = getCartItems();
  // return defer({cartItems:})
  return CartAPI.getCartItems();
};

const CartPage: FunctionComponent<CartPageProps> = () => {
  // const cartItems = useLoaderData() as CartItemModel[];
  const { cartItems, cartTotal } = useCartContext();
  console.log(cartItems);

  return (
    <Container>
      <Typography
        component="h1"
        variant="h2"
        sx={{ textAlign: "center", my: 3 }}
      >
        Cart
      </Typography>
      <Typography
        component="h1"
        variant="h2"
        sx={{ textAlign: "center", my: 3 }}
      >
        Products: {cartItems.length}
      </Typography>
      {cartItems && <CartList cartItems={cartItems} />}
      <Typography
        component="h1"
        variant="h2"
        sx={{ textAlign: "center", my: 3 }}
      >
        Total: {cartTotal} lei
      </Typography>
    </Container>
  );
};

export default CartPage;
