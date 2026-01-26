import { Navigate } from "react-router-dom";

export default function AdminProtectedRoute({ children }) {
  const admin = JSON.parse(localStorage.getItem("adminUser") || "null");
  if (!admin) return <Navigate to="/login" replace />;
  return children;
}
