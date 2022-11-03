import React from "react";
import "./style.scss";

const Register = () => {
  const registerHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData);
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
