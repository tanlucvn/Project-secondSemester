import { Box, Container } from "@mui/material";
import React, { useContext, useReducer, useEffect } from "react";
import { Store } from "../Store";
import ProductDisplay from "../components/ProductView/productDisplay";
import { useParams } from "react-router-dom";
import ProductInfo from "../components/ProductView/productInfo";
import SimilarProducts from "../components/ProductView/similarProduct";
import axios from "axios";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, products: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const ProductScreen = () => {
  const [{ loading, error, products }, dispatch] = useReducer(reducer, {
    products: [],
    loading: true,
    error: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get("/api/products");
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err.message });
      }
      //setProducts(result.data);
    };
    fetchData();
  }, []);
  const params = useParams();

  return (
    <>
      {products ? (
        <Container maxWidth={"xl"} component={"main"} sx={{ mt: "120px" }}>
          <Box
            display={"flex"}
            flexDirection={{ xs: "column", md: "row" }}
            width={"100%"}
            height={"100%"}
            justifyContent={"center"}
          >
            <ProductDisplay params={params} getProducts={products} />
            <Box
              display={"flex"}
              height={"100%"}
              width={"100%"}
              flexDirection={"column"}
              margin={"2rem"}
              flex={1}
            >
              <ProductInfo params={params} getProducts={products} />
              <SimilarProducts params={params} getProducts={products} />
            </Box>
          </Box>
        </Container>
      ) : (
        <>Product Not Found</>
      )}
    </>
  );
};

export default ProductScreen;
