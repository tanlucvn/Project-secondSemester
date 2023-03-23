import * as React from "react";
import { emphasize, styled } from "@mui/material/styles";
import { Breadcrumbs as MuiBreadcrumbs } from "@mui/material";
import Chip from "@mui/material/Chip";
import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor =
    theme.palette.mode === "light"
      ? theme.palette.grey[100]
      : theme.palette.grey[800];
  return {
    backgroundColor,
    height: theme.spacing(3),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    "&:hover, &:focus": {
      backgroundColor: emphasize(backgroundColor, 0.06),
    },
    "&:active": {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
  };
});

export default function Breadcrumbs({ current, links, icon }) {
  return (
    <MuiBreadcrumbs
      aria-label="breadcrumb"
      sx={{
        display: "flex",
        justifyContent: "center",
        mb: "2rem",
      }}
    >
      <StyledBreadcrumb
        label={current}
        icon={<HomeIcon fontSize="inherit" />}
      />
      {links.map((item, index) => (
        <StyledBreadcrumb
          key={index}
          label={item.title}
          component={Link}
          to={item.link}
          icon={icon}
        />
      ))}
    </MuiBreadcrumbs>
  );
}
