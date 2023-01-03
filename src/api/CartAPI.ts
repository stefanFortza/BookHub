import localforage from "localforage";
import { BookModel } from "./models/book.model";
import { CartItemModel } from "./models/cartItem.model";

export namespace CartAPI {
  export const addCartItem = async (book: Omit<BookModel, "commentsRef">) => {
    const cartItems = await getCartItems();

    if (cartItems) {
      const index = cartItems.findIndex((item) => item.id === book.id);
      if (index === -1) {
        cartItems.push({ ...book, quantity: 1 });
      } else {
        cartItems[index].quantity++;
      }

      return await setCartItems(cartItems);
    } else {
      console.log(book);

      return await setCartItems([{ ...book, quantity: 1 }]);
    }
  };

  export const removeCartItem = async (cartItem: CartItemModel) => {
    let cartItems = await getCartItems();

    if (cartItems) {
      const index = cartItems.findIndex((item) => item.id === cartItem.id);
      if (index !== -1) {
        cartItems = cartItems.splice(index, 1);
      }

      return await setCartItems(cartItems);
    }

    return [];
  };

  export const decreaseItemQuantity = async (cartItem: CartItemModel) => {
    let cartItems = await getCartItems();

    if (cartItems) {
      const index = cartItems.findIndex((item) => item.id === cartItem.id);
      if (index !== -1) {
        if (cartItems[index].quantity > 1) {
          cartItems[index].quantity--;
        }
      }

      return await setCartItems(cartItems);
    }

    return [];
  };

  export const getCartItems = async (): Promise<CartItemModel[] | null> => {
    return localforage.getItem<CartItemModel[] | null>("cartItems");
  };

  export const setCartItems = async (cartItems: CartItemModel[]) =>
    localforage.setItem<CartItemModel[]>("cartItems", cartItems);
}
