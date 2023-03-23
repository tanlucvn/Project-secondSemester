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
} from "@mui/material";
import {
  AddCircle,
  RemoveCircle,
  Delete,
  Add,
  Remove,
  DeleteOutline,
} from "@mui/icons-material";

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
    ctxDispatch({ type: "CART_REMOVE_ITEM", payload: item });
  };

  const checkoutHandler = () => {
    navigate("/shipping");
  };

  function CardItems({
    name,
    image,
    price,
    description,
    createdAt,
    item,
    quantity,
  }) {
    const theme = useTheme();
    return (
      <>
        <Card sx={{ display: "flex", mb: "1rem", boxShadow: "none" }}>
          <CardMedia
            component="img"
            sx={{ width: 151, aspectRatio: "2/1", borderRadius: "10px" }}
            image={image}
            alt={name}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <CardContent sx={{ flex: "1 0 auto" }}>
              <Typography component="div" variant="h5">
                {name}
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
              >
                {description}
              </Typography>
            </CardContent>
            <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
              <Button
                className="fui-button-shiny-2"
                onClick={() => updateCartHandler(item, item.quantity - 1)}
                variant="light"
                disabled={item.quantity === 1}
              >
                <Remove />
              </Button>{" "}
              <span>{item.quantity}</span>{" "}
              <Button
                className="fui-button-shiny-2"
                onClick={() => updateCartHandler(item, item.quantity + 1)}
                variant="light"
                disabled={item.quantity === 0}
              >
                <Add />
              </Button>
            </Box>
          </Box>
        </Card>
        <Divider textAlign="right" sx={{ mt: "1rem", mb: "1rem" }}>
          <Chip label={`$${price}`} />
          <IconButton
            className="fui-button-shiny-2"
            onClick={() => removeItemHandler(item)}
            variant="light"
          >
            <DeleteOutline />
          </IconButton>
        </Divider>
      </>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, mt: "100px" }}>
      <Card sx={{ maxWidth: 1000, margin: "auto", mt: 5 }}>
        <CardHeader title="Shopping Cart" />
        <CardContent>
          {cartItems.length === 0 ? (
            <Typography>
              Your cart is empty. <Link to="/">Go shopping</Link>
            </Typography>
          ) : (
            <List>
              {cartItems.map((item) => (
                <CardItems
                  name={item.name}
                  image={item.image}
                  price={item.price}
                  description={item.description}
                  category={item.category}
                  createdAt={item.createdAt}
                  quantity={item.quantity}
                  item={item}
                />
              ))}
            </List>
          )}
          <Grid container justifyContent="space-between">
            <Button
              variant="contained"
              color="primary"
              onClick={checkoutHandler}
              disabled={cartItems.length === 0}
            >
              Proceed to Checkout
            </Button>
            <Typography variant="h6">
              Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)} items):
              ${cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
            </Typography>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}
