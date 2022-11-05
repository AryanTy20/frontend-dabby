import axios, { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { customAxios } from "../../axios";
import { useUserContext } from "../../hook/useUserContext";
import { Link, useNavigate } from "react-router-dom";
import {
  BsFillEyeFill as ShowIcon,
  BsFillEyeSlashFill as HideIcon,
} from "react-icons/bs";
import "./style.scss";

export type errorType = {
  message: string;
  status: number;
  success: boolean;
};

const Login = () => {
  const { user, setUser } = useUserContext();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
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
      setUser({ name: res.data.user });
      navigate("/", { replace: true });
    } catch (err) {
      if (axios.isAxiosError(err) && err.message) {
        const { message, status } = err.response?.data as errorType;
        status === 400 ? setError(message) : setError("Something went wrong!");
      }
    }
  };

  return (
    <section className="login">
      <div className="login-box">
        {error && <p className="error text-center">{error}</p>}
        <h1 className="h2 text-center">Welcome Back !</h1>
        <h2 className="text-center my-2 h3">Login</h2>
        <form onSubmit={loginHandler}>
          <input
            className="form-control"
            type="text"
            name="username"
            placeholder="Username"
          />
          <div className="password">
            <input
              className="form-control"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
            />
            <div
              className="controls"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <HideIcon /> : <ShowIcon />}
            </div>
          </div>
          <input
            className="form-control btn btn-primary"
            type="submit"
            value="Login"
          />
        </form>
        <small>
          Not an user <Link to="/register">Sign up</Link>
        </small>
      </div>
    </section>
  );
};

export default Login;
