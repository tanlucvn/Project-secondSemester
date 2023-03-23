import React from "react";
import SearchBox from "../components/SearchBox";
import { useContext, useState, useEffect } from "react";
import { Store } from "../Store";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { styled, alpha } from "@mui/material/styles";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Container,
  Avatar,
  Button,
  Tooltip,
  InputBase,
  Badge,
  Divider,
} from "@mui/material";
import { MenuOutlined } from "@mui/icons-material";
import { SearchOutlined, ShoppingBagOutlined } from "@mui/icons-material";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";

function stringAvatar(name) {
  const nameParts = name.split(" ");
  const initials =
    nameParts.length >= 2
      ? `${nameParts[0][0]}${nameParts[1][0]}`
      : `${name[0]}`;

  return {
    children: initials,
  };
}

export default function NavHeader() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;
  const [user, setUser] = useState("");
  const {
    cart: { cartItems },
  } = state;

  useEffect(() => {
    const userInfoFromStorage = localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null;
    if (userInfoFromStorage) {
      setUser(userInfoFromStorage);
    }
  }, []);

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleLogout = () => {
    ctxDispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("userInfo");
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("paymentMethod");
    window.location.reload();
  };
  return (
    <AppBar
      position="fixed"
      color="transparent"
      sx={{
        backgroundColor: "#fff",
        transition:
          "margin-top 250ms cubic-bezier(0.4, 0, 0.6, 1) 0ms, background-color 250ms cubic-bezier(0.4, 0, 0.6, 1) 0ms",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            minHeight: { xs: 80 },
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          {/* mobile header 
          <Box sx={{ flexGrow: 0, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuOutlined />
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
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center">Contact Us</Typography>
              </MenuItem>
            </Menu>
          </Box>
          <Typography component="a" href="/">
            <Box
              sx={{
                display: { xs: "flex", md: "none" },
              }}
              component="img"
              alt="logo"
              src="/logo.png"
            />
          </Typography>
          */}

          {/* menus */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
            }}
          >
            <Button
              onClick={handleCloseNavMenu}
              sx={{
                display: "block",
                pl: 2,
                pr: 2,
                textTransform: "none",
                fontSize: "1.12rem",
                color: "black",
              }}
              component="a"
              href="#"
            >
              Home
            </Button>
            <Button
              onClick={handleCloseNavMenu}
              sx={{
                display: "block",
                pl: 2,
                pr: 2,
                ml: 2,
                textTransform: "none",
                fontSize: "1.12rem",
                color: "black",
              }}
              component="a"
              href="#categories"
            >
              Categories
            </Button>
            <Button
              onClick={handleCloseNavMenu}
              sx={{
                display: "block",
                pl: 2,
                pr: 2,
                ml: 2,
                textTransform: "none",
                fontSize: "1.12rem",
                color: "black",
              }}
              component="a"
              href="#trending"
            >
              Trending
            </Button>
            <Button
              onClick={handleCloseNavMenu}
              sx={{
                display: "block",
                pl: 2,
                pr: 2,
                ml: 2,
                textTransform: "none",
                fontSize: "1.12rem",
                color: "black",
              }}
              component="a"
              href="#contactUs"
            >
              Contact Us
            </Button>
          </Box>

          <Typography
            component="a"
            href="/"
            variant="h4"
            fontWeight="bold"
            color="black"
            sx={{ textDecoration: "none" }}
          >
            LUDU
          </Typography>

          <Box
            sx={{
              flexGrow: 0,
              display: "flex",
              alignItems: "center",
            }}
          >
            <SearchBox />
            <IconButton aria-label="cart" sx={{ marginRight: "1rem" }}>
              <Link to="/cart">
                <Badge
                  badgeContent={cart.cartItems.reduce(
                    (a, c) => a + c.quantity,
                    0
                  )}
                  color="error"
                >
                  <ShoppingBagOutlined sx={{ color: "black" }} />
                </Badge>
              </Link>
            </IconButton>

            {/* logged in */}
            {!user ? (
              <Link to="/signin" style={{ textDecoration: "none" }}>
                <Button
                  variant="outlined"
                  sx={{
                    border: "2px solid black",
                    color: "black",
                    "&:hover": {
                      backgroundColor: "black",
                      color: "white",
                      border: "2px solid black",
                    },
                  }}
                >
                  Login
                </Button>
              </Link>
            ) : (
              <Box sx={{ flexGrow: 0, display: "flex", alignItems: "center" }}>
                <Tooltip title="Open settings">
                  <IconButton
                    onClick={handleOpenUserMenu}
                    sx={{ p: 0, ml: 2, mr: 1 }}
                  >
                    <Avatar
                      {...stringAvatar(user.name)}
                      sx={{ backgroundColor: "black" }}
                    />
                  </IconButton>
                </Tooltip>
                <Typography>{user.name}</Typography>
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
                  <MenuItem sx={{ display: "flex", justifyContent: "center" }}>
                    <Avatar
                      {...stringAvatar(user.name)}
                      sx={{
                        backgroundColor: "black",
                        width: "200px",
                        height: "200px",
                      }}
                    />
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={() => navigate("/profile")}>
                    <Typography textAlign="center">Profile</Typography>
                  </MenuItem>
                  <MenuItem onClick={() => navigate("/orderHistory")}>
                    <Typography textAlign="center">Order History</Typography>
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
                  <Divider />
                  <Typography
                    sx={{
                      alignItems: "center",
                      display: "flex",
                      justifyContent: "center",
                      p: "0.2rem",
                    }}
                  >
                    <LocalAtmIcon />
                    {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
                  </Typography>
                </Menu>
              </Box>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
