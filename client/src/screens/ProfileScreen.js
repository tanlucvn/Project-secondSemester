import React, { useContext, useReducer, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Store } from "../Store";
import { toast } from "react-toastify";
import { getError } from "../utils";
import axios from "axios";
import {
  Grid,
  TextField,
  Box,
  Button,
  Container,
  CssBaseline,
  Avatar,
  Typography,
} from "@mui/material";
import {
  AccountCircle,
  ErrorOutline,
  CheckCircleOutline,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_REQUEST":
      return { ...state, loadingUpdate: true };
    case "UPDATE_SUCCESS":
      return { ...state, loadingUpdate: false };
    case "UPDATE_FAIL":
      return { ...state, loadingUpdate: false };

    default:
      return state;
  }
};

export default function ProfileScreen() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const [name, setName] = useState(userInfo.name);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [{ loadingUpdate }, dispatch] = useReducer(reducer, {
    loadingUpdate: false,
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Password does not match", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: "dark",
        icon: <ErrorOutline color="white" />,
        toastId: "submitHandler",
      });
      return;
    }

    try {
      const { data } = await axios.put(
        `/api/users/profile/${userInfo.userInfo._id}`,
        {
          name,
          password,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.userInfo.token}` },
        }
      );
      dispatch({
        type: "UPDATE_SUCCESS",
      });
      ctxDispatch({ type: "USER_SIGNIN", payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
      toast.error("Updated profile successfully", {
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
    } catch (err) {
      dispatch({
        type: "FETCH_FAIL",
      });
      toast.error(getError(err));
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "black" }}>
          <AccountCircle />
        </Avatar>
        <Typography component="h1" variant="h5">
          Profile
        </Typography>
        <form onSubmit={submitHandler} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            type="name"
            label="Name"
            fullWidth
            required
            value={name ? name : ""}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            margin="normal"
            type="password"
            label="Password"
            fullWidth
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            margin="normal"
            type="password"
            label="Confirm Password"
            fullWidth
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              backgroundColor: "black",
              border: "2px solid black",
              "&:hover": {
                backgroundColor: "white",
                border: "2px solid black",
                color: "black",
              },
            }}
          >
            Confirm
          </Button>
        </form>
      </Box>
    </Container>
  );
}
