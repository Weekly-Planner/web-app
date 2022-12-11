import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";

export default function PrivateRoutes() {
  const { currentUser } = useAuth();

  return currentUser ? <Outlet /> : <Navigate to={"/login"} />;
}
