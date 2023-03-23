import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import StarIcon from "@mui/icons-material/Star";
import Slider from "react-slick";
import Grid from "@mui/material/Grid";

const Categories = () => {
  const categories = [
    {
      title: "Womens Pants",
      image: "/images/category1.jpg",
    },

    {
      title: "Mens Jacket",
      image: "/images/product1.png",
    },

    {
      title: "Sweater",
      image: "/images/category2.jpg",
    },

    {
      title: "Womens Tops",
      image: "/images/event-tomato.jpg",
    },

    {
      title: "Pants",
      image: "/images/category3.jpg",
    },

    {
      title: "Womens Jackets",
      image: "/images/product4.jpg",
    },
  ];

  return (
    <Box
      sx={{
        mt: 4,
        mb: 4,
      }}
      id="categories"
    >
      <CssBaseline />
      <Container maxWidth="xl">
        <Typography variant="h4">Shop by Categories</Typography>
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  background: "rgba(0,0,0,0.5) url(/images/category1.jpg)",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundBlendMode: "multiply",
                  color: "#fff",
                  height: "70vh",
                  borderRadius: 2,
                  p: 3,
                  cursor: "pointer",
                }}
              >
                <Typography variant="h6">Women Pants</Typography>
                <Typography variant="body2">Explore</Typography>
              </Box>
            </Grid>

            <Grid item xs={12} md={4}>
              <Stack spacing={2}>
                <Box
                  sx={{
                    background: "rgba(0,0,0,0.5) url(/images/product1.png)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundBlendMode: "multiply",
                    color: "#fff",
                    height: "34vh",
                    borderRadius: 2,
                    p: 3,
                    cursor: "pointer",
                  }}
                >
                  <Typography variant="h6">Mens Jacket</Typography>
                  <Typography variant="body2">Explore</Typography>
                </Box>

                <Box
                  sx={{
                    background: "rgba(0,0,0,0.5) url(/images/event-tomato.jpg)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundBlendMode: "multiply",
                    color: "#fff",
                    height: "34vh",
                    borderRadius: 2,
                    p: 3,
                    cursor: "pointer",
                  }}
                >
                  <Typography variant="h6">Womens Tops</Typography>
                  <Typography variant="body2">Explore</Typography>
                </Box>
              </Stack>
            </Grid>

            <Grid item xs={12} md={4}>
              <Stack spacing={2}>
                <Box
                  sx={{
                    background: "rgba(0,0,0,0.5) url(/images/category2.jpg)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundBlendMode: "multiply",
                    color: "#fff",
                    height: "34vh",
                    borderRadius: 2,
                    p: 3,
                    cursor: "pointer",
                  }}
                >
                  <Typography variant="h6">Sweater</Typography>
                  <Typography variant="body2">Explore</Typography>
                </Box>

                <Grid container spacing={0}>
                  <Grid item xs={12} md={6}>
                    <Box
                      sx={{
                        background:
                          "rgba(0,0,0,0.5) url(/images/category3.jpg)",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundBlendMode: "multiply",
                        color: "#fff",
                        height: "34vh",
                        borderRadius: 2,
                        p: 3,
                        mr: { xs: 0, md: 1 },
                        mb: { xs: 2, md: 0 },
                        cursor: "pointer",
                      }}
                    >
                      <Typography variant="h6">Pants</Typography>
                      <Typography variant="body2">Explore</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box
                      sx={{
                        background: "rgba(0,0,0,0.5) url(/images/product4.jpg)",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundBlendMode: "multiply",
                        color: "#fff",
                        height: "34vh",
                        borderRadius: 2,
                        p: 3,
                        ml: { xs: 0, md: 1 },
                        cursor: "pointer",
                      }}
                    >
                      <Typography variant="h6">Womens Jackets</Typography>
                      <Typography variant="body2">Explore</Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};
export default Categories;
