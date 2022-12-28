import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import AddBookPage from "../pages/addBookPage/addBookPage";
import AuthentificationPage, {
  authentificationPageLoader,
} from "../pages/authentificationPage/authentificationPage";
import ShowBookPage, {
  showBookPageLoader,
} from "../pages/showBookPage/showBookPage";
import EditBookPage from "../pages/editBookPage/editBookPage";
import BooksPage, { booksPageLoader } from "../pages/booksPage/booksPage";
import Navigation from "../pages/navigation/navigation";
import { PageNames } from "../pages/navigation/pagesNames";
import ProtectedRoute, { protectedRouteLoader } from "../utils/protectedRoute";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={PageNames.Root} element={<Navigation />}>
      <Route index element={<div>Home Page</div>} />
      <Route path={PageNames.Books}>
        <Route index element={<BooksPage />} loader={booksPageLoader} />
        <Route element={<ProtectedRoute />} loader={protectedRouteLoader}>
          <Route path={PageNames.AddBook} element={<AddBookPage />} />
          <Route path={PageNames.EditBook} element={<EditBookPage />} />
          <Route
            path={PageNames.ShowBook}
            element={<ShowBookPage />}
            loader={showBookPageLoader}
          />
        </Route>
      </Route>
      <Route
        path={PageNames.Auth}
        element={<AuthentificationPage />}
        loader={authentificationPageLoader}
      />
    </Route>
  )
);
