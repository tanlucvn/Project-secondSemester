import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Container from "@mui/material/Container";
import { Typography, TextField, Paper } from "@mui/material";
import { FacebookOutlined } from "@mui/icons-material";

function Copyright() {
  return (
    <React.Fragment>
      {"© "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
    </React.Fragment>
  );
}

const iconStyle = {
  width: 48,
  height: 48,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "warning.main",
  mr: 1,
  "&:hover": {
    bgcolor: "warning.dark",
  },
};

const LANGUAGES = [
  {
    code: "en-US",
    name: "English",
  },
  {
    code: "vn-VN",
    name: "Vietnamese",
  },
];

export default function AppFooter() {
  return (
    <Paper elevation={3} sx={{ mt: "3rem" }}>
      <Typography
        component="footer"
        variant="overline"
        sx={{ display: "flex", bgcolor: "white" }}
      >
        <Container sx={{ my: 3, display: "flex" }}>
          <Grid container spacing={5}>
            <Grid item xs={6} sm={4} md={3}>
              <Grid
                container
                direction="column"
                justifyContent="flex-end"
                spacing={2}
                sx={{ height: 120 }}
              >
                <Grid item sx={{ display: "flex" }}>
                  <Box component="a" href="https://mui.com/" sx={iconStyle}>
                    <FacebookOutlined />
                  </Box>
                  <Box
                    component="a"
                    href="https://twitter.com/MUI_hq"
                    sx={iconStyle}
                  >
                    <img
                      src="/static/themes/onepirate/appFooterTwitter.png"
                      alt="Twitter"
                    />
                  </Box>
                </Grid>
                <Grid item>
                  <Copyright />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6} sm={4} md={2}>
              <Typography variant="h6" marked="left" gutterBottom>
                Legal
              </Typography>
              <Box component="ul" sx={{ m: 0, listStyle: "none", p: 0 }}>
                <Box component="li" sx={{ py: 0.5 }}>
                  <Link href="#!">Terms</Link>
                </Box>
                <Box component="li" sx={{ py: 0.5 }}>
                  <Link href="#!">Privacy</Link>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={6} sm={8} md={4}>
              <Typography variant="h6" marked="left" gutterBottom>
                Language
              </Typography>
              <TextField
                select
                size="medium"
                variant="standard"
                SelectProps={{
                  native: true,
                }}
                sx={{ mt: 1, width: 150 }}
              >
                {LANGUAGES.map((language) => (
                  <option value={language.code} key={language.code}>
                    {language.name}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid item>
              <Typography variant="caption">Copyright @ Ludustore</Typography>
            </Grid>
          </Grid>
        </Container>
      </Typography>
    </Paper>
  );
}
