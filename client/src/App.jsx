import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layout
import Navbar from "./components/Navbar";

// Public pages (müşteri)
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import About from "./pages/About";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";

// Auth
import Login from "./pages/Login";
import Register from "./pages/Register";

// Admin pages
import Products from "./pages/Products";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import AdminProtectedRoute from "./components/AdminProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* Müşteri (public) */}
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/about" element={<About />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />

        {/* Müşteri auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin panel */}
        <Route
          path="/admin/products"
          element={
            <AdminProtectedRoute>
              <Products />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/products/new"
          element={
            <AdminProtectedRoute>
              <AddProduct />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/products/:id/edit"
          element={
            <AdminProtectedRoute>
              <EditProduct />
            </AdminProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
