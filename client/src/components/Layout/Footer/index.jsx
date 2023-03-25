import React from "react";
import {
  Paper,
  Typography,
  Container,
  Grid,
  Box,
  Link,
  TextField,
  useMediaQuery,
} from "@mui/material";
import { FacebookOutlined, Twitter } from "@mui/icons-material";

const LANGUAGES = [
  { code: "en", name: "English" },
  { code: "vn", name: "Vietnamese" },
];

const Footer = () => {
  const isNonMobileScreens = useMediaQuery("(min-width: 600px)");
  return (
    <>
      {isNonMobileScreens ? (
        <Paper elevation={3} sx={{ mt: "3rem" }}>
          <Typography
            component="footer"
            variant="overline"
            sx={{
              display: "flex",
              bgcolor: "white",
              flexDirection: "column",
              justifyContent: "space-between",
              px: { xs: 2, sm: 3 },
              py: { xs: 3, sm: 4 },
              alignItems: { xs: "center", sm: "flex-start" },
            }}
          >
            <Container maxWidth="lg">
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={6} sm={4}>
                  <Typography variant="h6">SOCIAL</Typography>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Box
                      component="a"
                      href="#!"
                      sx={{
                        mr: 1,
                        color: "black",
                        textDecoration: "none",
                        fontSize: "0.7rem",
                        textAlign: "center",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="srOnly">Facebook</Typography>
                      <FacebookOutlined />
                    </Box>
                    <Box
                      component="a"
                      href="#!"
                      sx={{
                        mr: 1,
                        color: "black",
                        textDecoration: "none",
                        fontSize: "0.7rem",
                        textAlign: "center",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="srOnly">Twitter</Typography>
                      <Twitter />
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={4}>
                  <Typography variant="h6">Legal</Typography>
                  <Box component="ul" sx={{ m: 0, listStyle: "none", p: 0 }}>
                    <Box
                      component="a"
                      href="#!"
                      sx={{
                        mr: 1,
                        color: "black",
                        textDecoration: "none",
                        fontSize: "0.7rem",
                        textAlign: "center",
                      }}
                    >
                      <Typography variant="srOnly">Terms</Typography>
                    </Box>
                    <Typography variant="srOnly">Privacy</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    select
                    size="medium"
                    variant="standard"
                    SelectProps={{
                      native: true,
                    }}
                    sx={{ mb: 1, width: 150 }}
                  >
                    {LANGUAGES.map((language) => (
                      <option
                        value={language.code}
                        key={language.code}
                        style={{ width: "10px" }}
                      >
                        {language.name}
                      </option>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    variant="caption"
                    sx={{ textAlign: { xs: "center", sm: "left" } }}
                  >
                    © 2023 Ludustore. All rights reserved.
                  </Typography>
                </Grid>
              </Grid>
            </Container>
          </Typography>
        </Paper>
      ) : (
        <Paper elevation={3} sx={{ mt: "3rem" }}>
          <Typography
            component="footer"
            variant="overline"
            sx={{
              display: "flex",
              bgcolor: "white",
              flexDirection: "column",
              justifyContent: "space-between",
              px: { xs: 2, sm: 3 },
              py: { xs: 3, sm: 4 },
              alignItems: { xs: "center", sm: "flex-start" },
            }}
          >
            <Container maxWidth="lg">
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={6} sm={4}>
                  <Typography variant="h6">SOCIAL</Typography>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Box
                      component="a"
                      href="#!"
                      sx={{
                        mr: 1,
                        color: "black",
                        textDecoration: "none",
                        fontSize: "0.7rem",
                        textAlign: "center",
                      }}
                    >
                      <Typography variant="srOnly">Facebook</Typography>
                      <FacebookOutlined />
                    </Box>
                    <Box
                      component="a"
                      href="#!"
                      sx={{
                        mr: 1,
                        color: "black",
                        textDecoration: "none",
                        fontSize: "0.7rem",
                        textAlign: "center",
                      }}
                    >
                      <Typography variant="srOnly">Twitter</Typography>
                      <Twitter />
                    </Box>
                  </Box>
                </Grid>

                <Grid item xs={6} sm={4}>
                  <TextField
                    select
                    size="medium"
                    variant="standard"
                    SelectProps={{
                      native: true,
                    }}
                    sx={{ mb: 1, width: 150 }}
                  >
                    {LANGUAGES.map((language) => (
                      <option
                        value={language.code}
                        key={language.code}
                        style={{ width: "10px" }}
                      >
                        {language.name}
                      </option>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    variant="caption"
                    sx={{ textAlign: { xs: "center", sm: "left" } }}
                  >
                    © 2023 Ludustore. All rights reserved.
                  </Typography>
                </Grid>
              </Grid>
            </Container>
          </Typography>
        </Paper>
      )}
    </>
  );
};

export default Footer;
