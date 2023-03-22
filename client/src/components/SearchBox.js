import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import { useNavigate } from "react-router-dom";
import { styled, alpha } from "@mui/material/styles";
import { InputBase, IconButton } from "@mui/material";
import { SearchOutlined } from "@mui/icons-material";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: 8,
  backgroundColor: "#F0F0F0",
  // '&:hover': {
  //   backgroundColor: alpha(theme.palette.common.white, 0.25),
  // },
  marginLeft: 24,
  marginRight: 24,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  right: 16,
  cursor: "pointer",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  fontSize: "1rem",
  "& .MuiInputBase-input": {
    padding: "14px 48px 14px 24px",
    // vertical padding + font size from searchIcon
    // paddingLeft: `calc(1em + ${theme.spacing(2)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    // [theme.breakpoints.up('sm')]: {
    //   '&:focus': {
    //     width: '20ch',
    //   },
    // },
  },
}));

export default function SearchBox() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    navigate(query ? `/search/?query=${query}` : "/search");
  };

  return (
    <Form className="d-flex me-auto" onSubmit={submitHandler}>
      <Search>
        <SearchIconWrapper>
          <IconButton color="primary" type="submit">
            <SearchOutlined />
          </IconButton>
        </SearchIconWrapper>

        <StyledInputBase
          placeholder="Search here..."
          inputProps={{ "aria-label": "search" }}
          onChange={(e) => setQuery(e.target.value)}
        />
      </Search>
    </Form>
    /*    <div class="input-group">
    <input type="search" class="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
    <button type="button" class="btn btn-outline-primary">search</button>
  </div> */
  );
}
