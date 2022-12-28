import { FunctionComponent, useContext, useEffect, useState } from "react";
// import { Button, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/user/user.context";
import { PageNames } from "./pagesNames";
import { bookCount, seedDB } from "../../api/populate/seedDB";
import { signOutUser } from "../../api/AuthAPI";

interface NavigationProps {}

// const Navigation: FunctionComponent<NavigationProps> = () => {
//   const navigate = useNavigate();
//   const { currentUser } = useContext(UserContext);

//   const signOut = async () => {
//     await signOutUser();
//     navigate(0);
//   };

//   return (
//     <>
//       <Navbar bg="dark" expand="lg" variant="dark">
//         <Container>
//           <Navbar.Brand>
//             <i
//               style={{ width: "30px", height: "30px" }}
//               className="bi bi-book d-inline-block align-top"
//             ></i>
//             Book Shop
//           </Navbar.Brand>
//           <Navbar.Toggle aria-controls="basic-navbar-nav" />
//           <Navbar.Collapse>
//             <Nav className="me-auto">
//               <Nav.Link onClick={() => navigate("/")}>Home</Nav.Link>
//               <Nav.Link onClick={() => navigate("/books")}>Books Page</Nav.Link>
//               <Nav.Link
//                 onClick={() =>
//                   navigate("/books/add", {
//                     state: { from: "/books/add" },
//                   })
//                 }
//               >
//                 Add a book
//               </Nav.Link>
//               <Navbar.Text>
//                 <Button onClick={seedDB}>SeedDB</Button>
//               </Navbar.Text>
//               <Navbar.Text>
//                 <Button onClick={bookCount}>Count</Button>
//               </Navbar.Text>
//               <NavDropdown title="Dropdown" id="basic-nav-dropdown">
//                 <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
//                 <NavDropdown.Item href="#action/3.2">
//                   Another action
//                 </NavDropdown.Item>
//                 <NavDropdown.Item href="#action/3.3">
//                   Something
//                 </NavDropdown.Item>
//                 <NavDropdown.Divider />
//                 <NavDropdown.Item href="#action/3.4">
//                   Separated link
//                 </NavDropdown.Item>
//               </NavDropdown>
//             </Nav>
//             <Nav>
//               {currentUser ? (
//                 <>
//                   <Nav.Link onClick={signOut}>Sign Out</Nav.Link>
//                   <Navbar.Text>{currentUser.displayName}</Navbar.Text>
//                 </>
//               ) : (
//                 <Nav.Link onClick={() => navigate(PageNames.Auth)}>
//                   Sign In
//                 </Nav.Link>
//               )}
//             </Nav>
//           </Navbar.Collapse>
//         </Container>
//       </Navbar>
//       <Outlet />
//     </>
//   );
// };

// export default Navigation;

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { useUserContext } from "../../utils/utils";

type NavElData = { name: string; link: string };
const pages: NavElData[] = [
  { name: "Books", link: "/books" },
  { name: "AddBook", link: "/books/add" },
  { name: "Home", link: "/" },
];
const settings: NavElData[] = [
  { name: "Profile", link: "/" },
  { name: "Account", link: "/" },
  { name: "Dashboard", link: "/" },
];

const Navigation: FunctionComponent<NavigationProps> = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const navigate = useNavigate();
  const { currentUser } = useUserContext();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const signOut = async () => {
    await signOutUser();
    // navigate(0);
  };

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              BookShop
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map(({ name, link }) => (
                  <MenuItem key={name} onClick={handleCloseNavMenu}>
                    <Typography
                      textAlign="center"
                      onClick={() => navigate(link)}
                    >
                      {name}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              onClick={() => navigate("/")}
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              BookShop
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map(({ link, name }) => (
                <Button
                  key={name}
                  onClick={(e) => {
                    handleCloseNavMenu();
                    navigate(link);
                  }}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {name}
                </Button>
              ))}
            </Box>

            {/* User Icon */}
            {currentUser ? (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt="Remy Sharp"
                      src={currentUser?.photoURL || ""}
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map(({ link, name }) => (
                    <MenuItem key={name} onClick={handleCloseUserMenu}>
                      <Typography
                        textAlign="center"
                        onClick={() => navigate(link)}
                      >
                        {name}
                      </Typography>
                    </MenuItem>
                  ))}
                  <MenuItem
                    onClick={(e) => {
                      handleCloseUserMenu();
                      signOut();
                    }}
                  >
                    <Typography textAlign="center">SignOut</Typography>
                  </MenuItem>
                </Menu>
              </Box>
            ) : (
              <Box sx={{ flexGrow: 0 }}>
                <Button
                  onClick={(e) => {
                    handleCloseNavMenu();
                    navigate("/auth");
                  }}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  Sign In
                </Button>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      <Outlet />
    </>
  );
};

export default Navigation;
