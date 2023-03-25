import * as React from "react";

import {
  Box,
  Grid,
  Typography,
  Container,
  Button,
  Avatar,
} from "@mui/material";
import {
  HowToRegOutlined,
  DeliveryDiningOutlined,
  FeedbackOutlined,
} from "@mui/icons-material";

const item = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  px: 5,
};

const number = {
  fontSize: 24,
  fontFamily: "default",
  color: "black !important",
  fontWeight: "medium",
};

const image = {
  height: 55,
  my: 4,
};

function ProductHowItWorks() {
  return (
    <Box
      sx={{
        display: "flex",
        overflow: "hidden",
        color: "black",
        backgroundColor: "#fffff",
      }}
    >
      <Container
        sx={{
          mt: 7,
          mb: 7,
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" marked="center" component="h2" sx={{ mb: 7 }}>
          HOW IT WORKS
        </Typography>
        <div>
          <Grid container spacing={5}>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <Box sx={number}>1.</Box>
                <Avatar
                  sx={{
                    width: 100,
                    height: 100,
                    mt: 2,
                    mb: 2,
                    backgroundColor: "black",
                  }}
                >
                  <HowToRegOutlined fontSize="large" />
                </Avatar>
                <Typography variant="h5" align="center" mb={1}>
                  Register
                </Typography>
                <Typography variant="subtitle1" align="center">
                  Click the "Shop Now" button to register an account now to
                  become a member and receive many offers from Men's.
                </Typography>
                <Typography variant="caption" align="center">
                  Read more...
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <Box sx={number}>2.</Box>
                <Avatar
                  sx={{
                    width: 100,
                    height: 100,
                    mt: 2,
                    mb: 2,
                    backgroundColor: "black",
                  }}
                >
                  <DeliveryDiningOutlined fontSize="large" />
                </Avatar>
                <Typography variant="h5" align="center" mb={1}>
                  Delivery
                </Typography>
                <Typography variant="subtitle1" align="center">
                  Fast delivery, shipping to all areas in cooperation with many
                  delivery units.
                </Typography>
                <Typography variant="caption" align="center">
                  Read more...
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <Box sx={number}>3.</Box>
                <Avatar
                  sx={{
                    width: 100,
                    height: 100,
                    mt: 2,
                    mb: 2,
                    backgroundColor: "black",
                  }}
                >
                  <FeedbackOutlined fontSize="large" />
                </Avatar>
                <Typography variant="h5" align="center" mb={1}>
                  Feedback
                </Typography>
                <Typography variant="subtitle1" align="center">
                  Dedicated customer care team always answer questions.
                </Typography>
                <Typography variant="caption" align="center">
                  Read more...
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </div>
        <Button
          size="large"
          variant="contained"
          component="a"
          href="#!"
          sx={{
            mt: 8,
            color: "black",
            backgroundColor: "white",
            border: "2px solid black",
            "&:hover": { color: "white", backgroundColor: "black" },
          }}
        >
          Get started
        </Button>
      </Container>
    </Box>
  );
}

export default ProductHowItWorks;
