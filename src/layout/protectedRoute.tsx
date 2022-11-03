import { Outlet, Navigate } from "react-router-dom";
import { useUserContext } from "../hook/useUserContext";

const protectedRoute = () => {
  const { user, setUser } = useUserContext();
  return user ? <Outlet /> : <Navigate to={"/login"} replace={true} />;
};

export default protectedRoute;
