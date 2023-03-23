import axios from "axios";
import React, { useContext, useEffect, useReducer, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { Store } from "../Store";
import { getError } from "../utils";
import {
  FormGroup,
  TextField,
  Checkbox,
  FormControlLabel,
  Container,
  Typography,
  Paper,
  Button,
  Box,
  Grid,
  Chip,
  Divider,
} from "@mui/material";
import Breadcrumbs from "../components/Breadcrumbs";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "UPDATE_REQUEST":
      return { ...state, loadingUpdate: true };
    case "UPDATE_SUCCESS":
      return { ...state, loadingUpdate: false };
    case "UPDATE_FAIL":
      return { ...state, loadingUpdate: false };
    default:
      return state;
  }
};

export default function UserEditScreen() {
  const [{ loading, error, loadingUpdate }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
  });

  const { state } = useContext(Store);
  const { userInfo } = state;

  const params = useParams();
  const { id: userId } = params;
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/users/${userId}`, {
          headers: { Authorization: `Bearer ${userInfo.userInfo.token}` },
        });
        setName(data.name);
        setEmail(data.email);
        setIsAdmin(data.isAdmin);
        dispatch({ type: "FETCH_SUCCESS" });
      } catch (err) {
        dispatch({
          type: "FETCH_FAIL",
          payload: getError(err),
        });
      }
    };
    fetchData();
  }, [userId, userInfo]);
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: "UPDATE_REQUEST" });
      await axios.put(
        `/api/users/${userId}`,
        { _id: userId, name, email, isAdmin },
        {
          headers: { Authorization: `Bearer ${userInfo.userInfo.token}` },
        }
      );
      dispatch({
        type: "UPDATE_SUCCESS",
      });
      toast.success("User updated successfully");
      navigate("/admin/users");
    } catch (error) {
      toast.error(getError(error));
      dispatch({ type: "UPDATE_FAIL" });
    }
  };
  return (
    <Container className="small-container">
      <Helmet>
        <title>Edit User {userId}</title>
      </Helmet>

      <Breadcrumbs
        current="Admin"
        links={[
          { title: "Users", link: "/admin/users" },
          { title: "Edit", link: `/admin/user/${userId}` },
        ]}
      />

      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
          <Paper
            variant="outlined"
            sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
          >
            <form onSubmit={submitHandler}>
              <React.Fragment>
                <Typography variant="h6" gutterBottom>
                  Edit User: {userId}
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      required
                      label="Name"
                      fullWidth
                      autoComplete="given-name"
                      variant="standard"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      label="Email"
                      fullWidth
                      autoComplete="shipping country"
                      variant="standard"
                      value={email}
                      type="email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          color="secondary"
                          name="isAdmin"
                          id="isAdmin"
                          label="isAdmin"
                          checked={isAdmin}
                          onChange={(e) => setIsAdmin(e.target.checked)}
                        />
                      }
                      label={
                        <Chip
                          label={isAdmin ? "is Admin" : "not is Admin"}
                          sx={
                            isAdmin
                              ? { backgroundColor: "black", color: "white" }
                              : { backgroundColor: "#b3b3b3", color: "white" }
                          }
                        />
                      }
                    />
                  </Grid>
                </Grid>
                <Box sx={{ display: "flex", justifyContent: "space-around" }}>
                  <Button
                    sx={{
                      mt: 3,
                      ml: 1,
                      backgroundColor: "white",
                      border: "2px solid black",
                      color: "black",
                    }}
                    onClick={() => navigate(-1)}
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    sx={{
                      mt: 3,
                      ml: 1,
                      backgroundColor: "black",
                      color: "white",
                      "&:hover": { backgroundColor: "white", color: "black" },
                    }}
                  >
                    Update
                  </Button>
                </Box>
              </React.Fragment>
            </form>
          </Paper>
        </Container>
      )}
    </Container>
  );
}
