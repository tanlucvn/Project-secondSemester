import {
  ImageList,
  ImageListItem,
  ImageListItemBar,
  ListSubheader,
} from "@mui/material";
import React, { useContext, useReducer, useEffect } from "react";
import { Store } from "../../Store";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SimilarProducts = ({ params, getProducts }) => {
  const navigate = useNavigate();

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;
  const {
    cart: { cartItems },
  } = state;

  const activeProduct = cartItems.filter((prod) => prod.slug === params.slug);
  /* const sameCat = cartItems.filter(
    (prod) =>
      prod.category === activeProduct.category && prod._id !== activeProduct._id
  ); */
  const diffCat = getProducts.filter((prod) => prod.slug != params.slug);

  return (
    <ImageList
      sx={{
        width: { xs: "100%", md: 400 },
        height: { xs: "100%", md: 460 },
        padding: { xs: "0 4rem 0 0", md: 0 },
      }}
    >
      <ImageListItem key="Subheader" cols={2}>
        <ListSubheader component="div">Similar Products</ListSubheader>
      </ImageListItem>
      {diffCat.map((item, index) => {
        if (index < 4) {
          return (
            <ImageListItem
              key={item._id}
              sx={{ cursor: "pointer" }}
              onClick={() => navigate(`/product/${item.slug}`)}
            >
              <img src={item.image} srcSet={item.image} alt={item.name} />
              <ImageListItemBar title={item.name} />
            </ImageListItem>
          );
        }
      })}
    </ImageList>
  );
};

export default SimilarProducts;
