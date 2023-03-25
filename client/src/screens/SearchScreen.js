import React, { useEffect, useReducer, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { getError } from "../utils";
import { Helmet } from "react-helmet-async";
import Rating from "../components/Rating";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Button from "react-bootstrap/Button";
import LinkContainer from "react-router-bootstrap/LinkContainer";
import {
  Box,
  Grid,
  Paper,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Stack,
  Pagination,
} from "@mui/material";
import { NavigateNextOutlined, CancelOutlined } from "@mui/icons-material";
import ProductCard from "../components/ProductCard";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return {
        ...state,
        products: action.payload.products,
        page: action.payload.page,
        pages: action.payload.pages,
        countProducts: action.payload.countProducts,
        loading: false,
      };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

const prices = [
  {
    name: "1 to 50",
    value: "1-50",
  },
  {
    name: "51 to 200",
    value: "51-200",
  },
  {
    name: "201 to 1000",
    value: "201-1000",
  },
];

export const ratings = [
  {
    name: "stars & up",
    rating: 0,
  },
  {
    name: "1stars & up",
    rating: 1,
  },
  {
    name: "2stars & up",
    rating: 2,
  },
  {
    name: "3stars & up",
    rating: 3,
  },
  {
    name: "4stars & up",
    rating: 4,
  },
];

export default function SearchScreen() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const sp = new URLSearchParams(search); // /search?category=Shirts
  const category = sp.get("category") || "all";
  const query = sp.get("query") || "all";
  const price = sp.get("price") || "all";
  const rating = sp.get("rating") || "all";
  const order = sp.get("order") || "newest";
  const page = sp.get("page") || 1;

  const [crrP, setcrrP] = useState(1);
  const handleChange = (event, value) => {
    setcrrP(value);
  };
  const noProductFound = () => {
    if (crrP !== 0) {
      setcrrP(0);
    }
  };

  useEffect(() => {
    if (crrP > 0) {
      navigate(`?${getFilterUrl({ page: crrP }, true)}`);
    } else {
      navigate(`/search`);
    }
  }, [crrP]);

  const [{ loading, error, products, pages, countProducts }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: "",
    });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `/api/products/search?page=${page}&query=${query}&category=${category}&price=${price}&rating=${rating}&order=${order}`
        );
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({
          type: "FETCH_FAIL",
          payload: getError(error),
        });
      }
    };
    fetchData();
  }, [category, error, order, page, price, query, rating]);

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`/api/products/categories`);
        setCategories(data);
      } catch (err) {
        toast.error(getError(err));
      }
    };
    fetchCategories();
  }, [dispatch]);

  const getFilterUrl = (filter, skipPathname) => {
    const filterPage = filter.page || page;
    const filterCategory = filter.category || category;
    const filterQuery = filter.query || query;
    const filterRating = filter.rating || rating;
    const filterPrice = filter.price || price;
    const sortOrder = filter.order || order;
    return `${
      skipPathname ? "" : "/search?"
    }category=${filterCategory}&query=${filterQuery}&price=${filterPrice}&rating=${filterRating}&order=${sortOrder}&page=${filterPage}`;
  };
  return (
    <div>
      <Helmet>
        <title>Search Products</title>
      </Helmet>
      <Box>
        <Grid container spacing="2">
          <Grid item xs={12} sm={3}>
            <Paper>
              <Box display="flex" flexDirection="column" gap={0.2} padding={2}>
                <Box>
                  <h3>Department</h3>
                  <ul style={{ listStyle: "none", padding: 0 }}>
                    <li>
                      <ListItem
                        button
                        component={Link}
                        to={getFilterUrl({ category: "all" })}
                        style={{ padding: 0 }}
                      >
                        <ListItemIcon sx={{ minWidth: "unset", mr: "1rem" }}>
                          <NavigateNextOutlined />
                        </ListItemIcon>
                        <ListItemText primary="Any" />
                      </ListItem>
                    </li>
                    {categories.map((c) => (
                      <ListItem
                        key={c}
                        button
                        component={Link}
                        to={getFilterUrl({ category: c })}
                        style={{ padding: 0 }}
                      >
                        <ListItemIcon sx={{ minWidth: "unset", mr: "1rem" }}>
                          <NavigateNextOutlined />
                        </ListItemIcon>
                        <ListItemText primary={c} />
                      </ListItem>
                    ))}
                  </ul>
                </Box>
                <Box>
                  <h3>Price</h3>
                  <ul style={{ listStyle: "none", padding: 0 }}>
                    <li>
                      <ListItem
                        button
                        component={Link}
                        to={getFilterUrl({ price: "all" })}
                        style={{ padding: 0 }}
                      >
                        <ListItemIcon sx={{ minWidth: "unset", mr: "1rem" }}>
                          <NavigateNextOutlined />
                        </ListItemIcon>
                        <ListItemText primary="Any" />
                      </ListItem>
                    </li>
                    {prices.map((p) => (
                      <li key={p.value}>
                        <ListItem
                          button
                          component={Link}
                          to={getFilterUrl({ price: p.value })}
                          style={{ padding: 0 }}
                        >
                          <ListItemIcon sx={{ minWidth: "unset", mr: "1rem" }}>
                            <NavigateNextOutlined />
                          </ListItemIcon>
                          <ListItemText primary={p.name} />
                        </ListItem>
                      </li>
                    ))}
                  </ul>
                </Box>
                <Box>
                  <h3>Avg. Customer Review</h3>
                  <ul style={{ listStyle: "none" }}>
                    {ratings.map((r) => (
                      <li key={r.name}>
                        <ListItem
                          button
                          component={Link}
                          to={getFilterUrl({ rating: r.rating })}
                          style={{ padding: 0 }}
                        >
                          <Rating caption={" & up"} rating={r.rating}></Rating>
                        </ListItem>
                      </li>
                    ))}
                  </ul>
                </Box>
                <Box
                  sx={{ p: "1rem", display: "flex", justifyContent: "center" }}
                >
                  <Box>
                    <InputLabel
                      id="order-select-label"
                      sx={{ fontSize: "0.8rem" }}
                    >
                      Sort By
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        {countProducts === 0 ? "No" : countProducts} Results
                        {query !== "all" && " : " + query}
                        {category !== "all" && " : " + category}
                        {price !== "all" && " : Price " + price}
                        {rating !== "all" && " : Rating " + rating + " & up"}
                        {query !== "all" ||
                        category !== "all" ||
                        rating !== "all" ||
                        price !== "all" ? (
                          <IconButton
                            onClick={() => navigate("/search")}
                            component="label"
                            sx={{
                              "&:hover": { color: "#4d4d4d" },
                            }}
                          >
                            <CancelOutlined />
                          </IconButton>
                        ) : null}
                      </Box>
                    </InputLabel>
                    <FormControl>
                      <Select
                        labelId="order-select-label"
                        id="order-select"
                        value={order}
                        onChange={(e) => {
                          navigate(getFilterUrl({ order: e.target.value }));
                        }}
                      >
                        <MenuItem value="newest">Newest Arrivals</MenuItem>
                        <MenuItem value="lowest">Price: Low to High</MenuItem>
                        <MenuItem value="highest">Price: High to Low</MenuItem>
                        <MenuItem value="toprated">
                          Avg. Customer Reviews
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Box>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={9}>
            {loading ? (
              <LoadingBox></LoadingBox>
            ) : error ? (
              <MessageBox variant="danger">{error}</MessageBox>
            ) : (
              <>
                {products.length === 0 && (
                  <Box
                    sx={{ display: "flex", justifyContent: "center", mt: 30 }}
                  >
                    No product found
                    {noProductFound()}
                  </Box>
                )}
                <Grid container rowSpacing="20">
                  {products.map((product) => (
                    <Grid item xs={12} md={4} key={product._id}>
                      <ProductCard
                        key={product.name}
                        name={product.name}
                        description={product.description}
                        image={product.image}
                        price={product.price}
                        rating={product.rating}
                        category={product.category}
                        brand={product.brand}
                      />
                    </Grid>
                  ))}
                </Grid>

                <Stack spacing={2} mt="2rem">
                  <Pagination
                    count={pages}
                    page={crrP}
                    onChange={handleChange}
                    sx={{ display: "flex", justifyContent: "center" }}
                  />
                </Stack>
              </>
            )}
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
