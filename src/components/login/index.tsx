import axios from "axios";
import React, { useEffect } from "react";
import { customAxios } from "../../axios";
import { useUserContext } from "../../hook/useUserContext";
import { useNavigate } from "react-router-dom";
import "./style.scss";

const Login = () => {
  const { user, setUser } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    const alreadyLogged = async () => {
      try {
        const refreshUser = await customAxios("/auth/refreshuser");
        if (refreshUser) navigate("/", { replace: true });
      } catch (err) {
        if (axios.isAxiosError(err) && err.message) {
          console.log(err.message);
        }
      }
    };

    alreadyLogged();
  }, []);

  const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const payload = Object.fromEntries(formData);
    try {
      const res = await customAxios.post("/auth/login", payload);
      setUser(res.data.user);
      navigate("/", { replace: true });
    } catch (err) {
      if (axios.isAxiosError(err) && err.message) {
        console.log(err.message);
      }
    }
  };

  return (
    <section className="login">
      <div className="login-box">
        <h1>Welcome Back !</h1>
        <h2>Login</h2>
        <form onSubmit={loginHandler}>
          <input type="text" name="username" placeholder="Username" />
          <input type="password" name="password" placeholder="Password" />
          <input type="submit" value="Login" />
        </form>
      </div>
    </section>
  );
};

export default Login;
