import { FunctionComponent, useContext, useEffect, useState } from "react";
import { Button, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Outlet, useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/user/user.context";
import { AbsolutePageNames, PageNames } from "./pagesNames";

interface NavigationProps {}

const Navigation: FunctionComponent<NavigationProps> = () => {
  const navigate = useNavigate();
  const { currentUser, signOutUser } = useContext(UserContext);

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
              <Nav.Link onClick={() => navigate(AbsolutePageNames.Root)}>
                Home
              </Nav.Link>
              <Nav.Link onClick={() => navigate(AbsolutePageNames.Books)}>
                Books Page
              </Nav.Link>
              <Nav.Link
                onClick={() =>
                  navigate(AbsolutePageNames.AddBook, {
                    state: { from: "/books/add" },
                  })
                }
              >
                Add a book
              </Nav.Link>
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
                  <Navbar.Text>{currentUser.username}</Navbar.Text>
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
