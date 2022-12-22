export interface BookModel {
  id?: string;
  title: string;
  author: string;
  yearOfPublication: string;
  publisher: string;
  imageURLS: string;
  imageURLM: string;
  imageURLL: string;
  rating?: number;
  description: string;
  userId: string;
  price: number;
}
