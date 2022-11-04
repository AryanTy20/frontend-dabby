import axios from "axios";
import { customAxios } from "../axios";
import React, { useEffect, useState } from "react";
import { useUserContext } from "../hook/useUserContext";
import { Outlet } from "react-router-dom";

const persistantRoute = () => {
  const { user, setUser } = useUserContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        const refreshedUser = await customAxios("/auth/refreshuser");
        setUser(refreshedUser.data.user);
      } catch (err) {
        if (axios.isAxiosError(err) && err.message) {
          console.log(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    !user ? getUser() : setIsLoading(false);
  }, []);

  return isLoading ? <p></p> : <Outlet />;
};

export default persistantRoute;
