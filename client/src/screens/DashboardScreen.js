import React, { useContext, useEffect, useReducer } from "react";
import Chart from "react-google-charts";
import axios from "axios";
import { Store } from "../Store";
import { getError } from "../utils";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Paper,
} from "@mui/material";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return {
        ...state,
        summary: action.payload,
        loading: false,
      };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
export default function DashboardScreen() {
  const [{ loading, summary, error }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
  });
  const { state } = useContext(Store);
  const { userInfo } = state;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("/api/orders/summary", {
          headers: { Authorization: `Bearer ${userInfo.userInfo.token}` },
        });
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({
          type: "FETCH_FAIL",
          payload: getError(err),
        });
      }
    };
    fetchData();
  }, [userInfo]);

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                {summary.users && summary.users[0]
                  ? summary.users[0].numUsers
                  : 0}
              </Typography>
              <Typography color="text.secondary" gutterBottom>
                Users
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                {summary.orders && summary.orders[0]
                  ? summary.orders[0].numOrders
                  : 0}
              </Typography>
              <Typography color="text.secondary" gutterBottom>
                Orders
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                {summary.orders && summary.orders[0]
                  ? summary.orders[0].numOrders
                  : 0}
              </Typography>
              <Typography color="text.secondary" gutterBottom>
                Orders
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Box sx={{ flexGrow: 1, padding: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ padding: 3 }}>
              <Typography variant="h5" gutterBottom>
                Sales
              </Typography>
              {summary.dailyOrders.length === 0 ? (
                <Typography>No Sale</Typography>
              ) : (
                <Chart
                  chartType="AreaChart"
                  data={[
                    ["Date", "Sales"],
                    ...summary.dailyOrders.map((x) => [x._id, x.sales]),
                  ]}
                  options={{
                    legend: { position: "none" },
                    hAxis: { title: "Date", titleTextStyle: { color: "#333" } },
                    vAxis: {
                      title: "Sales",
                      titleTextStyle: { color: "#333" },
                    },
                  }}
                  width="100%"
                  height="300px"
                />
              )}
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ padding: 3 }}>
              <Typography variant="h5" gutterBottom>
                Categories
              </Typography>
              {summary.productCategories.length === 0 ? (
                <Typography>No Category</Typography>
              ) : (
                <Chart
                  chartType="PieChart"
                  data={[
                    ["Category", "Products"],
                    ...summary.productCategories.map((x) => [x._id, x.count]),
                  ]}
                  options={{
                    legend: { position: "right" },
                    pieSliceText: "label",
                    pieHole: 0.4,
                  }}
                  width="100%"
                  height="300px"
                />
              )}
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
