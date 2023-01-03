import React, {
  createContext,
  FunctionComponent,
  useEffect,
  PropsWithChildren,
  useState,
} from "react";
import { CartItemModel } from "../../api/models/cartItem.model";
import localforage from "localforage";
import { BookModel } from "../../api/models/book.model";
import { CartAPI } from "../../api/CartAPI";

type AddToCartType = (book: BookModel) => Promise<void>;
type RemoveFromCartType = (item: CartItemModel) => Promise<void>;
type IncreaseQtyType = (item: CartItemModel) => Promise<void>;
type DecreaseQtyType = (item: CartItemModel) => Promise<void>;

interface ICartContext {
  cartItems: CartItemModel[];
  cartTotal: number;
  cartQty: number;
  addToCart: AddToCartType;
  removeFromCart: RemoveFromCartType;
  increaseQty: IncreaseQtyType;
  decreaseQty: DecreaseQtyType;
}

interface CartContextProviderProps {
  children: React.ReactNode;
}

export const CartContext = createContext<ICartContext>({
  cartItems: [],
  cartTotal: 0,
  cartQty: 0,
  addToCart: async () => {},
  removeFromCart: async () => {},
  increaseQty: async () => {},
  decreaseQty: async () => {},
});

const CartContextProvider: FunctionComponent<PropsWithChildren<{}>> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<CartItemModel[]>([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [cartQty, setCartQty] = useState(0);

  useEffect(() => {
    CartAPI.getCartItems().then((cartItems) =>
      cartItems ? setCartItems(cartItems) : setCartItems([])
    );
  }, []);

  useEffect(() => {
    const newCartTotal = cartItems.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0
    );
    setCartTotal(newCartTotal);
  }, [cartItems]);

  useEffect(() => {
    const newCartQty = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    setCartQty(newCartQty);
  }, [cartItems]);

  const addToCart: AddToCartType = async ({
    commentsRef: _,
    ...book
  }: BookModel) => {
    const newCartItems = await CartAPI.addCartItem(book);
    setCartItems(newCartItems);
  };

  const removeFromCart: RemoveFromCartType = async (item: CartItemModel) => {
    const newCartItems = await CartAPI.removeCartItem(item);
    setCartItems(newCartItems);
  };

  const increaseQty: IncreaseQtyType = async ({
    quantity: _,
    ...item
  }: CartItemModel) => {
    const newCartItems = await CartAPI.addCartItem(item);
    setCartItems(newCartItems);
  };

  const decreaseQty: IncreaseQtyType = async (item: CartItemModel) => {
    const newCartItems = await CartAPI.decreaseItemQuantity(item);
    setCartItems(newCartItems);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartTotal,
        cartQty,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
