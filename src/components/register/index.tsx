import axios from "axios";
import React, { useState } from "react";
import { customAxios } from "../../axios";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../../hook/useUserContext";
import { errorType } from "../login";
import "./style.scss";

const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { user, setUser } = useUserContext();

  const registerHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData);
    try {
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

  return (
    <section className="register">
      <div className="register-box">
        {error && <p className="error">{error}</p>}
        <h1 className="h2 text-center">Register</h1>
        <form onSubmit={registerHandler}>
          <input
            className="form-control"
            type="text"
            name="username"
            placeholder="Username"
          />
          <input
            className="form-control"
            type="text"
            name="password"
            placeholder="Password"
          />
          <input
            className="form-control"
            type="text"
            name="repeatPassword"
            placeholder="Repeat Password"
          />
          <button className="form-control btn btn-primary" type="submit">
            Register
          </button>
        </form>
        <small>
          Already an user <Link to="/login">Sign in</Link>
        </small>
      </div>
    </section>
  );
};

export default Register;
