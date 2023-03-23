import { BrowserRouter, Routes, Route } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import SignInScreen from "./screens/signInPage/index";
import SignUpScreen from "./screens/signUpPage/index";
import OrderHistoryScreen from "./screens/OrderHistoryScreen";
import ShippingAddressScreen from "./screens/ShippingAddressScreen";
import ProfileScreen from "./screens/ProfileScreen";
import SearchScreen from "./screens/SearchScreen";
import NavHeader from "./components/NavHeader";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardScreen from "./screens/DashboardScreen";
import AdminRoute from "./components/AdminRoute";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import OrderListScreen from "./screens/OrderListScreen";
import NoMatch from "./screens/404Page";
import { Box } from "@mui/material";
function App() {
  return (
    <BrowserRouter>
      <ToastContainer position="bottom-center" limit={1} />
      <header>
        <NavHeader />
      </header>
      <main>
        <Box sx={{ mt: "120px" }}>
          <Routes>
            <Route path="/product/:slug" element={<ProductScreen />} />

            <Route path="/cart" element={<CartScreen />} />
            <Route path="/search" element={<SearchScreen />} />
            <Route path="/signin" element={<SignInScreen />} />
            <Route path="/signup" element={<SignUpScreen />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfileScreen />
                </ProtectedRoute>
              }
            />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/placeorder" element={<ShippingAddressScreen />} />
            <Route
              path="/orderhistory"
              element={
                <ProtectedRoute>
                  <OrderHistoryScreen />
                </ProtectedRoute>
              }
            />
            <Route path="/shipping" element={<ShippingAddressScreen />} />
            <Route path="/payment" element={<ShippingAddressScreen />} />
            {/* Admin Routes */}
            <Route
              path="/admin/dashboard"
              element={
                <AdminRoute>
                  <DashboardScreen />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <AdminRoute>
                  <UserListScreen />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/orders"
              element={
                <AdminRoute>
                  <OrderListScreen />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/products"
              element={
                <AdminRoute>
                  <ProductListScreen />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/item/:id"
              element={
                <AdminRoute>
                  <ProductEditScreen />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/user/:id"
              element={
                <AdminRoute>
                  <UserEditScreen />
                </AdminRoute>
              }
            />
            <Route path="/" element={<HomeScreen />} />
            <Route path="*" element={<NoMatch />} />
          </Routes>
        </Box>
      </main>
      <footer></footer>
    </BrowserRouter>
  );
}

export default App;
