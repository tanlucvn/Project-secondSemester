import * as React from "react";
import {
  Typography,
  Grid,
  TextField,
  Box,
  Container,
  Toolbar,
  Paper,
  Link,
  Button,
  StepLabel,
  Step,
  Stepper,
  AppBar,
  CssBaseline,
  FormControlLabel,
  Checkbox,
  List,
  ListItem,
  ListItemText,
  RadioGroup,
  FormControl,
  FormLabel,
  Radio,
  Divider,
  Chip,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Store } from "../Store";
import AddressForm from "../components/Shipping/AddressForm";
import PaymentForm from "../components/Shipping/PaymenForm";
import Review from "../components/Shipping/Review";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Ludustore
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const steps = ["Shipping address", "Payment details", "Review your order"];

function getStepContent() {
  switch (window.location.pathname.split("/")[1]) {
    case "shipping":
      return <AddressForm />;
    case "payment":
      return <PaymentForm />;
    case "placeorder":
      return <Review />;
    default:
      throw new Error("Unknown step");
  }
}

export default function Checkout() {
  return (
    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
      <Paper
        variant="outlined"
        sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
      >
        <Typography component="h1" variant="h4" align="center">
          Checkout
        </Typography>
        <React.Fragment>{getStepContent()}</React.Fragment>
      </Paper>
      <Copyright />
    </Container>
  );
}
