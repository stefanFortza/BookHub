export enum PageNames {
  Root = "/",
  Books = "books",
  AddBook = "add",
  EditBook = "edit/:bookId",
  ShowBook = "show/:bookId",
  Auth = "auth",
}

export enum AbsolutePageNames {
  Root = PageNames.Root,
  Books = PageNames.Root + PageNames.Books,
  AddBook = `${PageNames.Root}${PageNames.Books}/${PageNames.AddBook}`,
  EditBook = `${PageNames.Root}${PageNames.Books}/${PageNames.EditBook}`,
  ShowBook = `${PageNames.Root}${PageNames.Books}/${PageNames.ShowBook}`,
  Auth = `${PageNames.Root}${PageNames.Auth}`,
}
