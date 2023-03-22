import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState, useEffect, useContext } from "react";
import { Store } from "../../Store";
import axios from "axios";
import { toast } from "react-toastify";
import { Star, AddShoppingCartOutlined } from "@mui/icons-material";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function SearchItems({
  name,
  price,
  description,
  image,
  rating,
  category,
  item,
}) {
  const text = "add to cart";
  const icon = "fas fa-cart-plus";
  const [buttonIcon, setButtonIcon] = useState(icon);

  useEffect(() => {
    const timer = setTimeout(() => {
      setButtonIcon(icon);
    }, 1000);
    return () => clearTimeout(timer);
  }, [buttonIcon]);

  const [buttonText, setButtonText] = useState(text);

  useEffect(() => {
    const timer = setTimeout(() => {
      setButtonText(text);
    }, 1000);
    return () => clearTimeout(timer);
  }, [buttonText]);

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  useEffect(() => {
    document.addEventListener("checksubmit", addToCartHandler);
    return () => {
      document.removeEventListener("checksubmit", addToCartHandler);
    };
  });

  const addToCartHandler = async (item) => {
    const existItem = cartItems.find((x) => x._id === item._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${item._id}`);
    setButtonIcon("fas fa-cart-arrow-down");
    setButtonText("adding");
    toast.success("success");
    if (data.countInStock < quantity) {
      window.alert("Sorry. Product is out of stock");

      return;
    }
    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...item, quantity },
    });
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        action={
          <IconButton aria-label="settings">
            {rating} <Star />
          </IconButton>
        }
        title={name}
        subheader={category}
        sx={{ wordBreak: "break-word" }}
      />
      <CardMedia component="img" height="194" image={image} alt={name} />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          className="fui-button-shiny-2"
          onClick={() => addToCartHandler(item)}
        >
          <AddShoppingCartOutlined />
        </IconButton>
      </CardActions>
    </Card>
  );
}
