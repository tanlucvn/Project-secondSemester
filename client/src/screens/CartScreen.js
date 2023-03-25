import { useContext } from "react";
import { Store } from "../Store";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
  CardMedia,
  useTheme,
  Divider,
  Chip,
  Paper,
  Container,
} from "@mui/material";
import {
  AddCircle,
  RemoveCircle,
  Delete,
  Add,
  Remove,
  DeleteOutline,
  CheckCircleOutline,
  LocalAtmOutlined,
} from "@mui/icons-material";
import { toast } from "react-toastify";
import ShowMore from "../components/ShowMore";

export default function CartScreen() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const updateCartHandler = async (item, quantity) => {
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert("Sorry. Product is out of stock");
      return;
    }
    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...item, quantity },
    });
  };

  const removeItemHandler = (item) => {
    toast.success("Removed from your order", {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      theme: "dark",
      icon: <CheckCircleOutline color="white" />,
      toastId: "removeItemHandler",
    });
    ctxDispatch({ type: "CART_REMOVE_ITEM", payload: item });
  };

  const checkoutHandler = () => {
    navigate("/shipping");
  };

  return (
    <Box>
      {/* Order summary */}
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <List disablePadding>
            {cartItems.map((product) => (
              <>
                <Card sx={{ display: "flex", mb: "1rem", boxShadow: "none" }}>
                  <CardMedia
                    component="img"
                    sx={{
                      width: 151,
                      aspectRatio: "2/1",
                      borderRadius: "10px",
                    }}
                    image={product.image}
                    alt={product.name}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <CardContent sx={{ flex: "1 0 auto" }}>
                      <Typography component="div" variant="h5">
                        {product.name}
                      </Typography>
                      <ShowMore text={product.description} />
                    </CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        pl: 1,
                        pb: 1,
                      }}
                    >
                      <Button
                        className="fui-button-shiny-2"
                        onClick={() =>
                          updateCartHandler(product, product.quantity - 1)
                        }
                        variant="light"
                        disabled={product.quantity === 1}
                      >
                        <Remove />
                      </Button>{" "}
                      <span>{product.quantity}</span>{" "}
                      <Button
                        className="fui-button-shiny-2"
                        onClick={() =>
                          updateCartHandler(product, product.quantity + 1)
                        }
                        variant="light"
                        disabled={product.quantity === 0}
                      >
                        <Add />
                      </Button>
                    </Box>
                  </Box>
                </Card>
                <Divider textAlign="right" sx={{ mt: "1rem", mb: "1rem" }}>
                  <Chip label={`$${product.price}`} />
                  <IconButton
                    className="fui-button-shiny-2"
                    onClick={() => removeItemHandler(product)}
                    variant="light"
                  >
                    <DeleteOutline />
                  </IconButton>
                </Divider>
              </>
            ))}
            <ListItem sx={{ py: 1, px: 0 }}>
              <ListItemText primary="Items" />
              <Typography>
                {cartItems.map((product) => (
                  <>
                    <Typography>
                      {product.name}×{product.quantity}
                    </Typography>
                  </>
                ))}
              </Typography>
            </ListItem>
            <ListItem sx={{ py: 1, px: 0 }}>
              <ListItemText primary="Total Items" />
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: 700, display: "flex", alignItems: "center" }}
              >
                ({cartItems.reduce((a, c) => a + c.quantity, 0)})
              </Typography>
            </ListItem>
            <ListItem sx={{ py: 1, px: 0 }}>
              <ListItemText primary="Total" />
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: 700, display: "flex", alignItems: "center" }}
              >
                <LocalAtmOutlined />
                {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
              </Typography>
            </ListItem>
          </List>
          <ListItem
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={checkoutHandler}
              disabled={cartItems.length === 0}
              sx={{
                backgroundColor: "black",
                border: "2px solid black",
                "&:hover": {
                  backgroundColor: "white",
                  color: "black",
                },
              }}
            >
              Proceed to Checkout
            </Button>
          </ListItem>
        </Paper>
      </Container>
    </Box>
  );
}
