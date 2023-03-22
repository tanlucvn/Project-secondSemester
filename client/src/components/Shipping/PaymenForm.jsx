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
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Store } from "../../Store";

const steps = ["Step 1", "Create an ad group", "Create an ad"];

export default function PaymentForm() {
  const [paymentMethod, setPaymentMethod] = useState("");
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    ctxDispatch({ type: "SAVE_PAYMENT_METHOD", payload: paymentMethod });
    localStorage.setItem("paymentMethod", paymentMethod);
    navigate("/placeorder");
  };

  return (
    <>
      <Stepper activeStep={1} alternativeLabel sx={{ pt: 3, pb: 5 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <form onSubmit={submitHandler}>
        <React.Fragment>
          <Typography variant="h6" gutterBottom>
            Payment method
          </Typography>
          <FormControl>
            <FormLabel id="demo-controlled-radio-buttons-group">
              Choose payment
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              defaultValue="VisaCard"
            >
              <FormControlLabel
                value="VisaCard"
                control={<Radio />}
                label="VisaCard"
              />
              <FormControlLabel value="Momo" control={<Radio />} label="Momo" />
            </RadioGroup>
          </FormControl>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button type="submit" variant="contained" sx={{ mt: 3, ml: 1 }}>
              DDDDD
            </Button>
          </Box>
        </React.Fragment>
      </form>
    </>
  );
}
