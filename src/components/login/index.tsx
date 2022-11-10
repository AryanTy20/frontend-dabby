import axios, { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { customAxios } from "../../axios";
import { useUserContext } from "../../hook/useUserContext";
import { Link, useNavigate } from "react-router-dom";
import {
  BsFillEyeFill as ShowIcon,
  BsFillEyeSlashFill as HideIcon,
} from "react-icons/bs";
import { toast } from "react-toastify";

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
    setError("");
    const formData = new FormData(e.target as HTMLFormElement);
    const payload = Object.fromEntries(formData);
    try {
      const res = await customAxios.post("/auth/login", payload);
      setUser({ name: res.data.user });
      navigate("/", { replace: true });
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        const { message, status } = err.response?.data as errorType;
        status === 400 && setError(message);
      }
    }
  };

  useEffect(() => {
    if (error) {
      toast(error, {
        type: "error",
      });
    }
  }, [error]);

  return (
    <div className="login_box">
      <h1>Dobby Ads</h1>
      <h2>Sign In to your Account</h2>
      <form onSubmit={loginHandler}>
        <input type="text" placeholder="username" name="username" required />
        <div className="password">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            required
          />
          <div
            className="controls"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <HideIcon /> : <ShowIcon />}
          </div>
        </div>
        <input type="submit" value="login" />
      </form>
      <small>
        Don't have and account ? <Link to="/register">register</Link>
      </small>
    </div>
  );
};

export default Login;
