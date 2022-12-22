import { createBrowserRouter, useParams } from "react-router-dom";
import AddBookPage from "../pages/addBookPage/addBookPage";
import AuthentificationPage from "../pages/authentificationPage/authentificationPage";
import BookPage from "../pages/bookPage/bookPage";
import EditBookPage from "../pages/editBookPage/editBookPage";
import Home from "../pages/home/home";
import Navigation from "../pages/navigation/navigation";
import { PageNames } from "../pages/navigation/pagesNames";
import { withAuth } from "../utils/utils";

export const router = createBrowserRouter([
  {
    path: PageNames.Root,
    element: <Navigation />,
    children: [
      {
        index: true,
        element: <div>Home Page</div>,
      },
      {
        path: PageNames.Books,
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: PageNames.AddBook,
            // loader: withAuth(({ request }) => {
            //   console.log(request.url);
            // }),
            element: <AddBookPage />,
          },
          {
            path: PageNames.EditBook,
            element: <EditBookPage />,
          },
          {
            path: PageNames.ShowBook,
            element: <BookPage />,
          },
        ],
      },
      {
        path: PageNames.Auth,
        element: <AuthentificationPage />,
      },
    ],
  },
]);
