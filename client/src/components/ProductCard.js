import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Stack,
  Divider,
  BottomNavigation,
  BottomNavigationAction,
  Chip,
} from "@mui/material";
import {
  LocalAtmOutlined,
  AddShoppingCartOutlined,
  LocalActivity,
  CheckroomOutlined,
  CheckCircleOutline,
} from "@mui/icons-material";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext, useReducer, useEffect } from "react";
import { Store } from "../Store";
import { toast } from "react-toastify";
import ShowMore from "./ShowMore";

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

const ProductCard = ({
  image,
  name,
  brand,
  rating,
  description,
  price,
  category,
  createdAt,
  slug,
  _id,
}) => {
  const navigate = useNavigate();
  const [{ loading, error, products }, dispatch] = useReducer(reducer, {
    products: [],
    loading: true,
    error: "",
  });
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

useEffect(() => {
  const fetchData = async () => {
    dispatch({ type: "FETCH_REQUEST" });
    try {
      const result = await axios.get("/api/products", { headers: { Accept: 'application/json' }});
      dispatch({ type: "FETCH_SUCCESS", payload: result.data });
    } catch (err) {
      dispatch({ type: "FETCH_FAIL", payload: err.message });
    }
  };
  fetchData();
}, []);

  const addToCartHandler = async (items) => {
    const existItem = cart.cartItems.find((x) => x._id === items);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const thisProduct = products.filter((prod) => prod._id === items);
    const { data } = await axios.get(`/api/products/${thisProduct[0]._id}`);
    if (data.countInStock < quantity) {
      window.alert("Sorry. products is out of stock");
      return;
    } else {
      toast.success("Added to cart", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: "dark",
        icon: <CheckCircleOutline color="white" />,
        toastId: "addToCartHandler",
      });
    }
    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...thisProduct[0], quantity },
    });
  };

  return (
    <Box sx={{ p: 2 }}>
      <Card
        sx={{
          borderRadius: 2,
        }}
      >
        <CardMedia
          component="img"
          height="300"
          image={image}
          alt="green iguana"
          onClick={() => navigate(`/product/${slug}`)}
          sx={{
            "&:hover": {
              cursor: "pointer",
              opacity: "0.6",
              transition: ".5s ease",
            },
            objectFit: "contain",
          }}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            textAlign="start"
          >
            {name}
          </Typography>
          <Stack direction="row" spacing={1}>
            <Typography variant="body2">
              {description.length < 50 ? (
                <>
                  <Typography>{description}</Typography>
                </>
              ) : (
                <ShowMore text={description} />
              )}
            </Typography>
          </Stack>
          <Stack
            direction="row"
            spacing={2}
            sx={{ mt: 2, display: "flex", justifyContent: "space-evenly" }}
          >
            <Chip
              sx={{
                backgroundColor: "white",
                color: "black",
                border: "2px solid black",
                borderRadius: "8px",
              }}
              label={price}
              icon={<LocalAtmOutlined color="black" />}
            />
            <Chip
              sx={{
                backgroundColor: "white",
                color: "black",
                border: "2px solid black",
                borderRadius: "8px",
              }}
              label={category}
              onClick={() => navigate(`/search/?query=${category}`)}
            />
            <Chip
              sx={{
                backgroundColor: "white",
                color: "black",
                border: "2px solid black",
                borderRadius: "8px",
              }}
              label={brand}
              onClick={() => navigate(`/search/?query=${brand}`)}
            />
          </Stack>
        </CardContent>
        <Divider />
        <BottomNavigation
          showLabels
          value={(e) => e.target.value}
          onChange={(e) => e.target.value}
        >
          <BottomNavigationAction
            label="Views"
            icon={<CheckroomOutlined />}
            onClick={() => navigate(`/product/${slug}`)}
          />
          <BottomNavigationAction
            label="Buy"
            icon={<AddShoppingCartOutlined />}
            onClick={() => addToCartHandler(`${_id}`)}
          />
          <BottomNavigationAction
            label={`${rating} Rating`}
            icon={<LocalActivity />}
          />
        </BottomNavigation>
      </Card>
    </Box>
  );
};

export default ProductCard;
