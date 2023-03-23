import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const NoMatch = () => {
  const navigate = useNavigate();

  return (
    <Box height={"100%"}>
      <Container
        maxWidth={"xl"}
        sx={{
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card>
          <CardContent>
            <Typography variant="h4">404 error: Page not found</Typography>
          </CardContent>
          <CardActions>
            <Button
              size="large"
              variant="outlined"
              onClick={() => navigate(-1)}
            >
              Go Back
            </Button>
            <Button
              size="large"
              variant="outlined"
              color="success"
              onClick={() => navigate("/")}
            >
              Home
            </Button>
          </CardActions>
        </Card>
      </Container>
    </Box>
  );
};

export default NoMatch;
