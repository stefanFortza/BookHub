export interface BookModel {
  id?: number;
  isbn: string;
  title: string;
  author: string;
  yearOfPublication: string;
  publisher: string;
  imageURLS: string;
  imageURLM: string;
  imageURLL: string;
  rating: number;
  description: string;
  userId: number;
  price: number;
}
