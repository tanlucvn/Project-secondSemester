import { useEffect, useReducer } from "react";
import axios from "axios";
import logger from "use-reducer-logger";

import NotificationBar from "../components/Layout/Content/Notifications";
import EventCarousel from "../components/Layout/Content/Events";
import TrendingNow from "../components/Layout/Content/Trending";
import DealsOfDay from "../components/Layout/Content/Deals";
import EventProduct from "../components/Layout/Content/Events/EventProduct";
import Categories from "../components/Layout/Content/Categories";

//import data from '../data';
import { Helmet } from "react-helmet-async";
import ProductHowItWorks from "../components/Layout/Content/HowItWork";
import Offer from "../components/Layout/Content/Offer";
import AppFooter from "../components/Layout/Footer";

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

function HomeScreen({ theme }) {
  const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
    products: [],
    loading: true,
    error: "",
  });
  //onst [products, setProducts] = useState([]);
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
  return (
    <>
      <NotificationBar theme={theme} />
      <EventCarousel theme={theme} />
      <TrendingNow theme={theme} />
      <DealsOfDay theme={theme} />
      <EventProduct theme={theme} />
      <Categories theme={theme} />
      <ProductHowItWorks />
      <Offer />
      <AppFooter />
    </>
  );
}

export default HomeScreen;
