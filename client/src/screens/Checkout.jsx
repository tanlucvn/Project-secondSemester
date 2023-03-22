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

function getStepContent(step) {
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
  const [activeStep, setActiveStep] = React.useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <Container component="main" maxWidth="sm" sx={{ mb: 4, mt: "110px" }}>
      <Paper
        variant="outlined"
        sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
      >
        <Typography component="h1" variant="h4" align="center">
          Checkout
        </Typography>

        {activeStep === steps.length ? (
          <React.Fragment>
            <Typography variant="h5" gutterBottom>
              Thank you for your order.
            </Typography>
            <Typography variant="subtitle1">
              Your order number is #2001539. We have emailed your order
              confirmation, and will send you an update when your order has
              shipped.
            </Typography>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {getStepContent(activeStep)}
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              {activeStep !== 0 && (
                <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                  Back
                </Button>
              )}
              {activeStep === steps.length - 3 && (
                <Button
                  variant="contained"
                  onClick={() => {
                    handleNext();
                    navigate("/payment");
                  }}
                  sx={{ mt: 3, ml: 1 }}
                >
                  Next
                </Button>
              )}
              {activeStep === steps.length - 2 && (
                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 3, ml: 1 }}
                >
                  Next
                </Button>
              )}
              {activeStep === steps.length - 1 && (
                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 3, ml: 1 }}
                >
                  Submit
                </Button>
              )}
            </Box>
          </React.Fragment>
        )}
      </Paper>
      <Copyright />
    </Container>
  );
}
