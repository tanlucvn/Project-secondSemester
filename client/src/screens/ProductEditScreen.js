import React, {
  useContext,
  useEffect,
  useReducer,
  useState,
  useRef,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Store } from "../Store";
import { getError } from "../utils";
import { Helmet } from "react-helmet-async";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { toast } from "react-toastify";
import {
  FormGroup,
  TextField,
  Checkbox,
  FormControlLabel,
  Container,
  Typography,
  Paper,
  Button,
  Box,
  Grid,
  Chip,
  Divider,
  Input,
} from "@mui/material";
import Breadcrumbs from "../components/Breadcrumbs";
import { CheckCircleOutline } from "@mui/icons-material";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };

    case "UPDATE_REQUEST":
      return { ...state, loadingUpdate: true };
    case "UPDATE_SUCCESS":
      return { ...state, loadingUpdate: false };
    case "UPDATE_FAIL":
      return { ...state, loadingUpdate: false };

    case "UPLOAD_REQUEST":
      return { ...state, loadingUpload: true, errorUpload: "" };
    case "UPLOAD_SUCCESS":
      return {
        ...state,
        loadingUpload: false,
        errorUpload: "",
      };
    case "UPLOAD_FAIL":
      return { ...state, loadingUpload: false, errorUpload: action.payload };
    default:
      return state;
  }
};
export default function ProductEditScreen() {
  const navigate = useNavigate();
  const params = useParams(); // /product/:id
  const { id: productId } = params;

  const { state } = useContext(Store);
  const { userInfo } = state;
  const [{ loading, error, loadingUpdate, loadingUpload }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: "",
    });

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: "UPDATE_REQUEST" });
      await axios.put(
        `/api/products/${productId}`,
        {
          _id: productId,
          name,
          slug,
          price,
          image,
          category,
          brand,
          countInStock,
          description,
          rating,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.userInfo.token}` },
        }
      );
      dispatch({
        type: "UPDATE_SUCCESS",
      });
      toast.success("Updated product successfully", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: "dark",
        icon: <CheckCircleOutline color="white" />,
        toastId: "submitHandler",
      });
      navigate("/admin/products");
    } catch (err) {
      toast.error(getError(err));
      dispatch({ type: "UPDATE_FAIL" });
    }
  };

  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append("file", file);
    try {
      dispatch({ type: "UPLOAD_REQUEST" });
      const { data } = await axios.post("/api/upload", bodyFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `Bearer ${userInfo.userInfo.token}`,
        },
      });
      dispatch({ type: "UPLOAD_SUCCESS" });

      toast.success("Uploaded image successfully", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: "dark",
        icon: <CheckCircleOutline color="white" />,
        toastId: "uploadFileHandler",
      });
      setImage(data.secure_url);
    } catch (err) {
      toast.error(getError(err));
      dispatch({ type: "UPLOAD_FAIL", payload: getError(err) });
    }
  };

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/products/${productId}`);
        setName(data.name);
        setSlug(data.slug);
        setPrice(data.price);
        setImage(data.image);
        setCategory(data.category);
        setCountInStock(data.countInStock);
        setBrand(data.brand);
        setDescription(data.description);
        setRating(data.rating);
        dispatch({ type: "FETCH_SUCCESS" });
      } catch (err) {
        dispatch({
          type: "FETCH_FAIL",
          payload: getError(err),
        });
      }
    };
    fetchData();
  }, [productId]);

  return (
    <>
      <Container className="small-container">
        <Helmet>
          <title>Edit Product</title>
        </Helmet>

        <Breadcrumbs
          current="Admin"
          links={[
            { title: "Products", link: "/admin/products" },
            { title: "Edit", link: `/admin/item/${productId}` },
          ]}
        />

        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
            <Paper
              variant="outlined"
              sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
            >
              <form onSubmit={submitHandler}>
                <React.Fragment>
                  <Typography variant="h6" gutterBottom>
                    Edit Product: {productId}
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <TextField
                        required
                        label="Name"
                        fullWidth
                        variant="standard"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        label="Slug"
                        fullWidth
                        variant="standard"
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={8}>
                      <TextField
                        required
                        label="Image"
                        fullWidth
                        variant="outlined"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={4} display="inline-flex">
                      <Button
                        variant="contained"
                        onClick={handleButtonClick}
                        sx={{
                          ml: "2rem",
                          backgroundColor: "white",
                          border: "2px solid black",
                          color: "black",
                          "&:hover": {
                            border: "none",
                            backgroundColor: "white",
                          },
                        }}
                      >
                        Upload
                      </Button>
                      <Input
                        type="file"
                        inputRef={fileInputRef}
                        style={{ display: "none" }}
                        onChange={uploadFileHandler}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <TextField
                        required
                        label="Price"
                        fullWidth
                        variant="outlined"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <TextField
                        required
                        label="Stock"
                        fullWidth
                        variant="outlined"
                        value={countInStock}
                        onChange={(e) => setCountInStock(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <TextField
                        required
                        label="Rating"
                        fullWidth
                        variant="outlined"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        label="Category"
                        fullWidth
                        variant="standard"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        label="Brand"
                        fullWidth
                        variant="standard"
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        required
                        label="Description"
                        fullWidth
                        variant="standard"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </Grid>
                  </Grid>
                  <Box sx={{ display: "flex", justifyContent: "space-around" }}>
                    <Button
                      sx={{
                        mt: 3,
                        ml: 1,
                        backgroundColor: "white",
                        border: "2px solid black",
                        color: "black",
                      }}
                      onClick={() => navigate(-1)}
                    >
                      Back
                    </Button>
                    <Button
                      type="submit"
                      sx={{
                        mt: 3,
                        ml: 1,
                        backgroundColor: "black",
                        color: "white",
                        "&:hover": {
                          backgroundColor: "white",
                          color: "black",
                        },
                      }}
                    >
                      Update
                    </Button>
                  </Box>
                </React.Fragment>
              </form>
            </Paper>
          </Container>
        )}
      </Container>
    </>
  );
}
