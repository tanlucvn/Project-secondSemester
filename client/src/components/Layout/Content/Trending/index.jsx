import * as React from "react";
import Box from "@mui/material/Box";
import {
  Typography,
  Button,
  Container,
  CssBaseline,
  Stack,
  Card,
  CardMedia,
  CardActions,
  CardContent,
  IconButton,
  Divider,
} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import StarIcon from "@mui/icons-material/Star";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState, useEffect, useRef, useReducer } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  LinearProgress,
  BottomNavigation,
  BottomNavigationAction,
} from "@mui/material";
import ProductCard from "../../../ProductCard";

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

const TrendingNow = () => {
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

  const refSlider = useRef(null);
  const refNextArrow = useRef(null);
  const refPrevArrow = useRef(null);

  const NextArrow = (e) => {
    return (
      <IconButton
        onClick={e.onClick}
        ref={refNextArrow}
        sx={{
          position: "absolute",
          top: "45%",
          right: 0,
          background: "rgba(39, 39, 39, 0.8)",
          color: "#fff",
        }}
      >
        <NavigateNextIcon />
      </IconButton>
    );
  };

  const PrevArrow = (e) => {
    return (
      <IconButton
        onClick={e.onClick}
        ref={refPrevArrow}
        sx={{
          position: "absolute",
          top: "45%",
          left: 0,
          zIndex: 1,
          background: "rgba(39, 39, 39, 0.8)",
          color: "#fff",
        }}
      >
        <NavigateBeforeIcon />
      </IconButton>
    );
  };

  const setting = {
    dots: false,
    infinite: true,
    slidesToShow: 4,
    swipeToSlide: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1250,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const onSliderMouseOver = () => {
    refNextArrow.current.style.opacity = 1;
    refPrevArrow.current.style.opacity = 1;
  };
  const onSliderMouseOut = () => {
    refNextArrow.current.style.opacity = 0;
    refPrevArrow.current.style.opacity = 0;
  };

  useEffect(
    () => {
      const node = refSlider.current;
      if (node) {
        node.addEventListener("mouseover", onSliderMouseOver);
        node.addEventListener("mouseout", onSliderMouseOut);
        return () => {
          node.removeEventListener("mouseover", onSliderMouseOver);
          node.removeEventListener("mouseout", onSliderMouseOut);
        };
      }
    },
    [refSlider.current] // Recall only if ref changes
  );

  return (
    <>
      {loading ? (
        <Container maxWidth="xl">
          <Typography variant="h4">Trending Now</Typography>
          <LinearProgress />
        </Container>
      ) : (
        <Box
          sx={{
            mt: 4,
            mb: 4,
          }}
          id="trending"
        >
          <CssBaseline />
          <Container maxWidth="xl">
            <Typography variant="h4">Trending Now</Typography>
            <Box ref={refSlider}>
              <Slider {...setting}>
                {products.map((product) => {
                  return (
                    <ProductCard
                      key={product.name}
                      name={product.name}
                      description={product.description}
                      image={product.image}
                      price={product.price}
                      rating={product.rating}
                      category={product.category}
                      brand={product.brand}
                      slug={product.slug}
                      _id={product._id}
                    />
                  );
                })}
              </Slider>
            </Box>
          </Container>
        </Box>
      )}
    </>
  );
};
export default TrendingNow;
