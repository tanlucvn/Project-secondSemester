import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Store } from "../../Store";

import {
  Box,
  Container,
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";

export default function SignupScreen() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmpassword] = useState("");
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      console.log("passwords do not match");
      return;
    }
    try {
      const { data } = await axios.post("/api/users/signup", {
        name,
        email,
        password,
      });
      ctxDispatch({ type: "USER_SIGNIN", payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate(redirect || "/");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate.apply(redirect);
    }
  }, [navigate, redirect, userInfo]);

  return (
    <Container component="main" maxWidth="xs">
      <Box
        component="Form"
        onSubmit={submitHandler}
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <TextField
          margin="normal"
          type="name"
          label="Name"
          fullWidth
          required
          onChange={(e) => setName(e.target.value)}
        />

        <TextField
          margin="normal"
          type="email"
          label="Email Address"
          fullWidth
          required
          onChange={(e) => setEmail(e.target.value)}
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
          label="Password"
          fullWidth
          required
          onChange={(e) => setConfirmpassword(e.target.value)}
        />

        <Button type="submit">Sign Up</Button>

        <Link to="/signin" variant="body2">
          {"Already have a account? Sign In"}
        </Link>
      </Box>
    </Container>
  );
}
