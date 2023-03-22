import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Store } from "../../Store";
import axios from "axios";
import { LocalAtm, Add, Remove, Close } from "@mui/icons-material";
import { Navigate, useNavigate } from "react-router-dom";

const ProductInfo = ({ params, getProducts }) => {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;
  let cartElem = "";
  const {
    cart: { cartItems },
  } = state;
  const activeProduct = getProducts.find((prod) => prod.slug === params.slug);

  if (activeProduct) {
    cartElem = cartItems.find((item) => item.slug === activeProduct.slug);
  }
  const isMobile = useMediaQuery(`(max-width:600px)`);

  const addToCartHandler = async () => {
    const existItem = cart.cartItems.find((x) => x._id === activeProduct._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${activeProduct._id}`);

    if (data.countInStock < quantity) {
      window.alert("Sorry. products is out of stock");
      return;
    }
    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...activeProduct, quantity },
    });
  };
  const decreaseHandler = async () => {
    const existItem = cart.cartItems.find((x) => x._id === activeProduct._id);
    const quantity = existItem ? existItem.quantity - 1 : 1;
    const { data } = await axios.get(`/api/products/${activeProduct._id}`);
    if (data.countInStock < quantity) {
      window.alert("Sorry. Product is out of stock");
      return;
    }
    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...existItem, quantity },
    });
  };
  const removeItemHandler = () => {
    ctxDispatch({ type: "CART_REMOVE_ITEM", payload: activeProduct });
  };

  return (
    <>
      {activeProduct ? (
        <Box width={{ xs: "100%", md: 465 }} pr={"4rem"}>
          <Card>
            <CardContent>
              <Typography variant="h4" gutterBottom color={"primary"}>
                {activeProduct.name}
              </Typography>
              <Typography variant="h6" gutterBottom color={"text.secondary"}>
                {activeProduct.description}
              </Typography>
              <Typography
                variant="h5"
                fontWeight={"500"}
                alignItems="center"
                display="flex"
              >
                Price: <span>&nbsp;</span>
                <LocalAtm /> {activeProduct.price}
              </Typography>
            </CardContent>
            <CardActions
              sx={{
                flexDirection: "column",
                gap: "1rem",
                alignItems: "start",
                p: "1rem",
              }}
            >
              <ButtonGroup
                size="small"
                aria-label="increment=decrement buttons"
              >
                {cartElem ? (
                  <>
                    <Button
                      size="small"
                      color={cartElem.quantity === 1 ? "error" : "primary"}
                      variant={isMobile ? "contained" : "outlined"}
                      onClick={
                        cartElem.quantity === 1
                          ? () =>
                              ctxDispatch({
                                type: "REMOVE_FROM_CART",
                                payload: cartElem,
                              })
                          : () => decreaseHandler()
                      }
                    >
                      {cartElem.quantity === 1 ? <Close /> : <Remove />}
                    </Button>
                    <Button
                      size="small"
                      disabled
                      sx={{
                        "&.Mui-disabled": {
                          color: "text.primary",
                        },
                      }}
                    >
                      {cartElem.quantity}
                    </Button>
                  </>
                ) : (
                  <></>
                )}
                <Button
                  size="small"
                  color={!cartElem ? "success" : "primary"}
                  variant={isMobile ? "contained" : "outlined"}
                  onClick={
                    !cartElem
                      ? () => addToCartHandler()
                      : () => addToCartHandler()
                  }
                >
                  <Add /> {!cartElem && "add to cart"}
                </Button>
              </ButtonGroup>
              {cartElem && (
                <Box display="flex">
                  <Button
                    size="large"
                    color="error"
                    variant={isMobile ? "contained" : "outlined"}
                    onClick={() => removeItemHandler()}
                  >
                    Delete
                  </Button>

                  <Button
                    size="large"
                    color="success"
                    variant={isMobile ? "contained" : "outlined"}
                    onClick={() => navigate("/cart")}
                    sx={{ ml: "15px" }}
                  >
                    Go cart
                  </Button>
                </Box>
              )}
            </CardActions>
          </Card>
        </Box>
      ) : (
        <>Product Not Found</>
      )}
    </>
  );
};

export default ProductInfo;
