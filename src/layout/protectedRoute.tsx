import { Outlet, Navigate } from "react-router-dom";

import React from "react";

const protectedRoute = () => {
  const user = "Aryan";
  return user ? <Outlet /> : <Navigate to={"/login"} replace={true} />;
};

export default protectedRoute;
