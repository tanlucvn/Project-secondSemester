import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

const CarouselItem = () => {
  return (
    <Box>
      <Grid container>
        <Grid item xs={12} sm={6} md={6.43}>
          <Box
            sx={{
              width: "100%",
            }}
            component="img"
            alt="PRADA"
            src="/images/event-prada.jpg"
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          md={5.57}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundImage: "url(/images/event-prada-background.png)",
          }}
        >
          <Stack
            spacing={{ xs: 1, md: 2 }}
            alignItems="center"
            sx={{ m: { xs: 4, sm: 0 } }}
          >
            <Box
              sx={{ mb: { xs: 1, md: 4 }, width: "80%" }}
              component="img"
              alt="PRADA"
              src="/images/prada.svg"
            />
            <Typography variant="h4" color={"#565656"}>
              Big Fashion Festival
            </Typography>
            <Typography variant="h4" color={"#565656"}>
              50% - 80% off
            </Typography>
            <Button
              variant="outlined"
              sx={{ textTransform: "none", pl: 6, pr: 6 }}
            >
              Explore
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

const EventCarousel = () => {
  const setting = {
    dots: true,
    arrows: false,
    infinite: true,
    swipeToSlide: true,
    speed: 1000,
    autoPlay: true,
    autoplaySpeed: 2000,
  };
  return (
    <Box
      sx={{
        mb: 8,
      }}
    >
      <CssBaseline />
      <Container maxWidth="xl" disableGutters>
        <Slider {...setting}>
          <CarouselItem />
          <CarouselItem />
          <CarouselItem />
          <CarouselItem />
          <CarouselItem />
        </Slider>
      </Container>
    </Box>
  );
};
export default EventCarousel;
