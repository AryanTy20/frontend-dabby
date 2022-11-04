import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { customAxios } from "../../axios";
import { useUserContext } from "../../hook/useUserContext";
import "./style.scss";

const HomePage = () => {
  const { user, setUser } = useUserContext();
  const navigate = useNavigate();
  const logout = async () => {
    try {
      const res = await customAxios("/auth/logout");
      setUser(null);
      res.status == 200 && navigate("/login", { replace: true });
    } catch (err) {
      if (axios.isAxiosError(err) && err.message) {
        console.log(err.message);
      }
    }
  };

  return (
    <>
      <nav>
        <h1>Welcome {user?.name}</h1>
        <button onClick={logout}>logout</button>
      </nav>
      <main></main>
      <footer></footer>
    </>
  );
};

export default HomePage;
