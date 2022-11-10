import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Login from "../login";
import Register from "../register";
import "./style.scss";

const Auth = () => {
  const location = useLocation();
  const [showLogin, setShowLogin] = useState(true);
  useEffect(() => {
    setShowLogin(location.pathname === "/login" ? true : false);
  }, [location.pathname]);
  return (
    <section className="auth">
      <div className="auth-box">{showLogin ? <Login /> : <Register />}</div>
    </section>
  );
};

export default Auth;
