import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Rating from "./Rating.js";
import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { Store } from "../Store";
import "../CSS/products.css";
import { toast } from "react-toastify";

function Product(props) {
  const text = "add to cart";
  const icon = "fas fa-cart-plus";

  /* fas fa-cart-plus */
  /* fas fa-cart-arrow-down */
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

  const { item } = props;

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
    <Card className='card-1 '>
      <Link to={`/product/${item.slug}`}>
        <img
          src={item.image}
          className='card-img-top bt-card-ui-3 card-image'
          alt={item.name}
        />
      </Link>
      <Card.Body>
        <Link to={`/product/${item.slug}`}>
          <Card.Title className='card-name'>{item.name}</Card.Title>
        </Link>
        <Rating rating={item.rating} numReviews={item.numReviews} />
        <Card.Text>${item.price}</Card.Text>
        {item.countInStock === 0 ? (
          <Button className='fui-button-shiny-2' variant='light' disabled>
            Out of stock
          </Button>
        ) : (
          <Button
            className='fui-button-shiny-2'
            onClick={() => addToCartHandler(item)}
          >
            {buttonText}
            <i className={buttonIcon}></i>
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}

export default Product;
