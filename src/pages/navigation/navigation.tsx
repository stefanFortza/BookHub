import { FunctionComponent } from "react";
import { Outlet, useNavigate } from "react-router-dom";
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
import AutoStoriesSharpIcon from "@mui/icons-material/AutoStoriesSharp";
import { useCartContext, useUserContext } from "../../utils/utils";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { styled } from "@mui/material/styles";
import { Badge, BadgeProps } from "@mui/material";
import { AuthAPI } from "../../api/AuthAPI";

interface NavigationProps {}

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

type NavElData = { name: string; link: string };
const pages: NavElData[] = [{ name: "Books", link: "/books" }];
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
  const { cartQty } = useCartContext();

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
    await AuthAPI.signOutUser();
    navigate(0);
  };

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AutoStoriesSharpIcon
              sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
            />
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

            <AutoStoriesSharpIcon
              sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
            />
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
              <Box sx={{ flexGrow: 0, display: { xs: "flex", md: "flex" } }}>
                <Tooltip
                  // title="Open settings"
                  title=""
                >
                  <IconButton
                    //  onClick={handleOpenUserMenu}
                    sx={{ p: 0 }}
                  >
                    <Avatar
                      alt="Remy Sharp"
                      src={currentUser?.photoURL || ""}
                    />
                  </IconButton>
                </Tooltip>
                <Button
                  onClick={(e) => {
                    handleCloseNavMenu();
                    // navigate("/auth");
                  }}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {currentUser.displayName}
                </Button>
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
              <Box sx={{ flexGrow: 0, display: { xs: "flex", md: "flex" } }}>
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
            <Box sx={{ flexGrow: 0, display: { xs: "flex", md: "flex" } }}>
              <Button
                onClick={(e) => {
                  handleCloseNavMenu();
                  navigate("/cart");
                }}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                <StyledBadge badgeContent={cartQty} color="secondary">
                  <ShoppingCartIcon />
                </StyledBadge>
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Box sx={{ mb: 10 }}>
        <Outlet />
      </Box>
    </>
  );
};

export default Navigation;
