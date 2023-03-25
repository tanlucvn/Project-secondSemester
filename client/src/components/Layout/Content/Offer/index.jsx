import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { Typography, TextField, Button, Snackbar, Paper } from "@mui/material";
import { toast } from "react-toastify";
import { SentimentSatisfiedAltOutlined } from "@mui/icons-material";

function Offer() {
  const [offerMail, setOfferMail] = React.useState("");

  const handleSubmit = () => {
    if (offerMail) {
      toast(
        `We will send you our best offers, once a week. Thanks ${offerMail}`,
        {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          theme: "dark",
          icon: <SentimentSatisfiedAltOutlined color="white" />,
          toastId: "offer",
        }
      );
    }
  };

  return (
    <Container component="section" sx={{ mt: 10, display: "flex" }}>
      <Grid container id="contactUs">
        <Grid item xs={12} md={6} sx={{ zIndex: 1 }}>
          <Paper
            elevation={3}
            sx={{
              display: "flex",
              justifyContent: "center",
              bgcolor: "white",
              color: "black",
              py: 8,
              px: 3,
            }}
          >
            <Box sx={{ maxWidth: 400 }}>
              <Typography variant="h2" component="h2" gutterBottom>
                Receive offers
              </Typography>
              <Typography variant="h5">
                Sign up to receive the latest product alerts.
              </Typography>
              <TextField
                noBorder
                placeholder="Your email"
                variant="standard"
                sx={{ width: "100%", mt: 3, mb: 2 }}
                value={offerMail}
                onChange={(e) => setOfferMail(e.target.value)}
              />
              <Button
                size="large"
                variant="contained"
                component="a"
                onClick={() => handleSubmit()}
                sx={{
                  color: "black",
                  backgroundColor: "white",
                  border: "2px solid black",
                  "&:hover": { color: "white", backgroundColor: "black" },
                }}
              >
                Keep me updated
              </Button>
            </Box>
          </Paper>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{ display: { md: "block", xs: "none" }, position: "relative" }}
        >
          <Box
            component="img"
            src="https://picsum.photos/600"
            alt="call to action"
            sx={{
              position: "absolute",
              top: -28,
              left: -28,
              right: 0,
              bottom: 0,
              width: "70%",
              maxWidth: 600,
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Offer;
