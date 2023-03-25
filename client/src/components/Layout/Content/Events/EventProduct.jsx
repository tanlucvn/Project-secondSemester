import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const EventProduct = () => {
  return (
    <Box
      sx={{
        mb: 8,
      }}
    >
      <CssBaseline />
      <Container maxWidth="xl" disableGutters>
        <Box
          sx={{
            textAlign: "center",
            pt: 15,
            pb: 15,
            background: "rgba(0,0,0,0.5) url(/images/event-tomato.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundBlendMode: "multiply",
            color: "#fff",
          }}
        >
          <Typography variant="h2" sx={{ mb: 6 }}>
            FOREVER 23
          </Typography>
          <Typography variant="h4" sx={{ mb: 4 }}>
            Big Fashion Festival
          </Typography>
          <Typography variant="h4" sx={{ mb: 6 }}>
            70% - 80% off
          </Typography>
          <Button
            variant="outlined"
            sx={{
              textTransform: "none",
              pl: 6,
              pr: 6,
              color: "white",
              border: "2px solid white",
              "&:hover": {
                border: "2px solid white",
              },
            }}
          >
            Explore
          </Button>
        </Box>
      </Container>
    </Box>
  );
};
export default EventProduct;
