import axios from "axios";
import React, { useEffect, useState } from "react";
import { customAxios } from "../../axios";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../../hook/useUserContext";
import { errorType } from "../login";
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { user, setUser } = useUserContext();

  const registerHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData);
    setError("");
    try {
      console.log(data);
      const response = await customAxios.post("/auth/register", data);
      setUser({ name: response.data.user });
      navigate("/", { replace: true });
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        const { message, status } = err.response?.data as errorType;
        if (status === 403) {
          setError(message);
        } else {
          setError("Something went wrong!");
        }
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
    <div className="register_box">
      <h1>Dobby Ads</h1>
      <h2>Sign In to your Account</h2>
      <form onSubmit={registerHandler}>
        <input type="text" placeholder="username" name="username" required />
        <input type="text" placeholder="password" name="password" required />
        <input
          type="text"
          placeholder="repeat password"
          name="repeatPassword"
          required
        />
        <input type="submit" value="Create Account" />
      </form>
      <small>
        Already an user ? <Link to="/login">login</Link>
      </small>
    </div>
  );
};

export default Register;
