import React, { useContext, useEffect, useReducer, useState } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { toast } from "react-toastify";
import { Store } from "../Store";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { getError } from "../utils";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Breadcrumbs from "../components/Breadcrumbs";
import { Helmet } from "react-helmet-async";
import {
  Box,
  Chip,
  Pagination,
  PaginationItem,
  Stack,
  Typography,
} from "@mui/material";
import { CheckCircleOutline } from "@mui/icons-material";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return {
        ...state,
        products: action.payload.products,
        page: action.payload.page,
        pages: action.payload.pages,
        loading: false,
      };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "CREATE_REQUEST":
      return { ...state, loadingCreate: true };
    case "CREATE_SUCCESS":
      return {
        ...state,
        loadingCreate: false,
      };
    case "CREATE_FAIL":
      return { ...state, loadingCreate: false };

    case "DELETE_REQUEST":
      return { ...state, loadingDelete: true, successDelete: false };
    case "DELETE_SUCCESS":
      return {
        ...state,
        loadingDelete: false,
        successDelete: true,
      };
    case "DELETE_FAIL":
      return { ...state, loadingDelete: false, successDelete: false };

    case "DELETE_RESET":
      return { ...state, loadingDelete: false, successDelete: false };
    default:
      return state;
  }
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "black",
    color: "white",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#e6e6e6",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function ProductListScreen() {
  const [
    {
      loading,
      error,
      products,
      pages,
      loadingCreate,
      loadingDelete,
      successDelete,
    },
    dispatch,
  ] = useReducer(reducer, {
    loading: true,
    error: "",
  });

  const navigate = useNavigate();
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const page = sp.get("page") || 1;
  const [crrP, setcrrP] = useState(1);
  const handleChange = (event, value) => {
    setcrrP(value);
  };

  useEffect(() => {
    if (crrP > 0) {
      navigate(`/admin/products?page=${crrP}`);
    } else {
      navigate(`/admin/products?page=1`);
    }
  }, [crrP]);

  const { state } = useContext(Store);
  const { userInfo } = state;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`/api/products/admin?page=${page} `, {
          headers: { Authorization: `Bearer ${userInfo.userInfo.token}` },
        });
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {}
    };
    if (successDelete) {
      dispatch({ type: "DELETE_RESET" });
    } else {
      fetchData();
    }
  }, [page, userInfo, successDelete]);

  const createHandler = async () => {
    if (window.confirm("Are you sure to create?")) {
      try {
        dispatch({ type: "CREATE_REQUEST" });
        const { data } = await axios.post(
          "/api/products",
          {},
          {
            headers: { Authorization: `Bearer ${userInfo.userInfo.token}` },
          }
        );
        toast.success("product created successfully");
        dispatch({ type: "CREATE_SUCCESS" });
        navigate(`/admin/item/${data.item._id}`);
      } catch (err) {
        toast.error(getError(error));
        dispatch({
          type: "CREATE_FAIL",
        });
      }
    }
  };
  const deleteHandler = async (item) => {
    if (window.confirm("Are you sure to delete?")) {
      try {
        await axios.delete(`/api/products/${item._id}`, {
          headers: { Authorization: `Bearer ${userInfo.userInfo.token}` },
        });
        toast.success("Delete product successfully", {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          theme: "dark",
          icon: <CheckCircleOutline color="white" />,
          toastId: "deleteHandle",
        });
        dispatch({ type: "DELETE_SUCCESS" });
      } catch (err) {
        toast.error(getError(error));
        dispatch({
          type: "DELETE_FAIL",
        });
      }
    }
  };
  return (
    <div>
      <Helmet>
        <title>Products</title>
      </Helmet>

      <Breadcrumbs
        current="Admin"
        links={[{ title: "Products", link: "/admin/products" }]}
      />

      {loadingDelete && <LoadingBox></LoadingBox>}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>ID</StyledTableCell>
                <StyledTableCell align="center">Name</StyledTableCell>
                <StyledTableCell align="center">Price</StyledTableCell>
                <StyledTableCell align="center">Brand</StyledTableCell>
                <StyledTableCell align="center">Category</StyledTableCell>
                <StyledTableCell align="center">Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((item) => (
                <StyledTableRow key={item._id}>
                  <StyledTableCell component="th" scope="item">
                    {item._id}
                  </StyledTableCell>
                  <StyledTableCell align="center">{item.name}</StyledTableCell>
                  <StyledTableCell align="center">{item.price}</StyledTableCell>
                  <StyledTableCell align="center">
                    {item.category}
                  </StyledTableCell>
                  <StyledTableCell align="center">{item.brand}</StyledTableCell>
                  <StyledTableCell align="center">
                    <Button
                      type="button"
                      size="small"
                      onClick={() => navigate(`/admin/item/${item._id}`)}
                      sx={{
                        backgroundColor: "white",
                        color: "black",
                        border: "2px solid black",
                      }}
                    >
                      Edit
                    </Button>
                    &nbsp;
                    <Button
                      type="button"
                      size="small"
                      onClick={() => deleteHandler(item)}
                      sx={{
                        backgroundColor: "black",
                        color: "white",
                        border: "2px solid black",
                        "&:hover": {
                          backgroundColor: "none",
                          color: "black",
                          border: "none",
                        },
                      }}
                    >
                      Delete
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Stack spacing={2} mt="2rem">
        <Pagination
          count={pages}
          page={crrP}
          onChange={handleChange}
          sx={{ display: "flex", justifyContent: "center" }}
        />
      </Stack>
    </div>
  );
}
