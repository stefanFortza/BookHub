import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import SignInPage from "../components/authComponents/signInPage/signInPage";
import SignUpPage from "../components/authComponents/signUpPage/signUpPage";
import AuthentificationPage, {
  authentificationPageLoader,
} from "../pages/authentificationPage/authentificationPage";
import BooksPage from "../pages/booksPage/booksPage";
import HomePage from "../pages/homePage/homePage";
import { PageNames } from "../pages/navigation/pagesNames";
import ShowBookPage, {
  showBookPageLoader,
} from "../pages/showBookPage/showBookPage";
import Navigation from "../pages/navigation/navigation";
import CartPage, { cartPageLoader } from "../pages/cartPage/cartPage";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      {/* <Route element={<ProtectedRoute />} loader={protectedRouteLoader}> */}
      <Route path={PageNames.Root} element={<Navigation />}>
        <Route index element={<HomePage />} />

        <Route path={PageNames.Books}>
          <Route index element={<BooksPage />} />

          <Route
            path={PageNames.ShowBook}
            element={<ShowBookPage />}
            loader={showBookPageLoader}
          />
        </Route>

        <Route path="/cart" element={<CartPage />} loader={cartPageLoader} />
      </Route>
      {/* </Route> */}

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
