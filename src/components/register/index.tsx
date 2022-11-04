import axios from "axios";
import React from "react";
import { customAxios } from "../../axios";
import { useNavigate } from "react-router-dom";
import "./style.scss";
import { useUserContext } from "../../hook/useUserContext";

const Register = () => {
  const navigate = useNavigate();
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
        console.log(err.response.data);
      } else {
        console.log(err);
      }
    }
  };

  return (
    <section className="register">
      <div className="register-box">
        <h1>Register</h1>
        <form onSubmit={registerHandler}>
          <input type="text" name="username" placeholder="Username" />
          <input type="text" name="password" placeholder="Password" />
          <input
            type="text"
            name="repeatPassword"
            placeholder="Repeat Password"
          />
          <button type="submit">Register</button>
        </form>
      </div>
    </section>
  );
};

export default Register;
