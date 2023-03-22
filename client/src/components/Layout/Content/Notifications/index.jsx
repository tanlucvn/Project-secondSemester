import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

const NotificationBar = () => {
  return (
    <Box
      sx={{
        mt: "80px",
        backgroundColor: "#F9FAFF",
        textAlign: "center",
        padding: 1,
      }}
    >
      <CssBaseline />
      <Container maxWidth="xl">
        <Stack
          spacing={{ xs: 0, sm: 1 }}
          direction={{ xs: "column", sm: "row" }}
          alignItems="center"
          justifyContent="center"
        >
          <Typography>
            Invite Friends and get 50% off on your next purchase
          </Typography>
          <Button
            sx={{ textTransform: "none", color: "#00398F", fontSize: "1rem" }}
          >
            Invite Now
          </Button>
        </Stack>
      </Container>
    </Box>
  );
};
export default NotificationBar;
