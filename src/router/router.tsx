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
import ProtectedRoute, {
  protectedRouteLoader,
} from "../utils/components/protectedRoute";
import SignInPage from "../components/authComponents/signInPage/signInPage";
import SignUpPage from "../components/authComponents/signUpPage/signUpPage";
import HomePage from "../pages/homePage/homePage";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route element={<ProtectedRoute />} loader={protectedRouteLoader}>
        <Route path={PageNames.Root} element={<Navigation />}>
          <Route index element={<HomePage />} />

          <Route path={PageNames.Books}>
            <Route index element={<BooksPage />} loader={booksPageLoader} />

            <Route path={PageNames.AddBook} element={<AddBookPage />} />

            <Route path={PageNames.EditBook} element={<EditBookPage />} />

            <Route
              path={PageNames.ShowBook}
              element={<ShowBookPage />}
              loader={showBookPageLoader}
            />
          </Route>
        </Route>
      </Route>

      <Route
        path={PageNames.Auth}
        element={<AuthentificationPage />}
        loader={authentificationPageLoader}
      >
        <Route index element={<SignInPage />} />
        <Route path="signup" element={<SignUpPage />} />
      </Route>
    </Route>
  )
);
