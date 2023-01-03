import { BookModel, IBook } from "./book.model";

export interface CartItemModel extends IBook {
  id: string;
  quantity: number;
}
