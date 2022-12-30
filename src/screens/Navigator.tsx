import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "../contexts/AuthProvider";
import Dashboard from "./Dashboard";
import Home from "./Home";
import Login from "./Login";
import PrivateRoutes from "./PrivateRoutes";
import Signup from "./Signup";

export default function Navigator() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Private Routes */}
            <Route element={<PrivateRoutes />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </HelmetProvider>
  );
}
