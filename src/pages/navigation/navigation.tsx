import { FunctionComponent, useContext, useEffect, useState } from "react";
import { Button, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Outlet, useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/user/user.context";
import { PageNames } from "./pagesNames";
import { bookCount, seedDB } from "../../api/populate/seedDB";
import { signOutUser } from "../../api/auth/AuthAPI";

interface NavigationProps {}

const Navigation: FunctionComponent<NavigationProps> = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);

  const signOut = async () => {
    await signOutUser();
    navigate(0);
  };

  return (
    <>
      <Navbar bg="dark" expand="lg" variant="dark">
        <Container>
          <Navbar.Brand>
            <i
              style={{ width: "30px", height: "30px" }}
              className="bi bi-book d-inline-block align-top"
            ></i>
            Book Shop
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse>
            <Nav className="me-auto">
              <Nav.Link onClick={() => navigate("/")}>Home</Nav.Link>
              <Nav.Link onClick={() => navigate("/books")}>Books Page</Nav.Link>
              <Nav.Link
                onClick={() =>
                  navigate("/books/add", {
                    state: { from: "/books/add" },
                  })
                }
              >
                Add a book
              </Nav.Link>
              <Navbar.Text>
                <Button onClick={seedDB}>SeedDB</Button>
              </Navbar.Text>
              <Navbar.Text>
                <Button onClick={bookCount}>Count</Button>
              </Navbar.Text>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              {currentUser ? (
                <>
                  <Nav.Link onClick={signOut}>Sign Out</Nav.Link>
                  <Navbar.Text>{currentUser.displayName}</Navbar.Text>
                </>
              ) : (
                <Nav.Link onClick={() => navigate(PageNames.Auth)}>
                  Sign In
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
};

export default Navigation;
