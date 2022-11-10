import React, { useEffect, useState } from "react";
import { customAxios } from "../../axios";
import { useUserContext } from "../../hook/useUserContext";
import { useNavigate } from "react-router-dom";
import "./style.scss";
import axios from "axios";
import { errorType } from "../login";
import { toast } from "react-toastify";

const menus = ["Home", "Upload", "Search", "Logout"];

type NavbarProps = {
  setActiveTab: React.Dispatch<
    React.SetStateAction<{
      allImg: boolean;
      uploadImg: boolean;
      searchImg: boolean;
    }>
  >;
};

const Navbar = ({ setActiveTab }: NavbarProps) => {
  const [openMenu, setOpenMenu] = useState(false);
  const [error, setError] = useState("");
  const { user, setUser } = useUserContext();
  const navigate = useNavigate();
  const updateTab = (item: string) => {
    switch (item) {
      case "Home":
        setActiveTab({
          allImg: true,
          uploadImg: false,
          searchImg: false,
        });
        break;
      case "Upload":
        setActiveTab({
          allImg: false,
          uploadImg: true,
          searchImg: false,
        });
        break;
      case "Search":
        setActiveTab({
          allImg: false,
          uploadImg: false,
          searchImg: true,
        });
        break;
    }
  };

  const logout = async () => {
    try {
      const res = await customAxios("/auth/logout");
      setUser(null);
      res.status == 200 && navigate("/login", { replace: true });
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        const { message, status } = err.response?.data as errorType;
        setError(message);
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
    <nav className="navbar">
      <div className="logo">
        <h1>Dobby Ads</h1>
      </div>
      <div
        className={`ham ${openMenu ? "ham-open" : ""}`}
        onClick={() => setOpenMenu(!openMenu)}
      >
        <p></p>
        <p></p>
        <p></p>
      </div>
      <ul className={`menu ${openMenu ? "menu-open" : "menu-close"}`}>
        {menus.map((item, i, arr) => {
          if (i === arr.length - 1) {
            return (
              <button key={i} onClick={logout}>
                {item}
              </button>
            );
          } else {
            return (
              <li
                key={i}
                onClick={() => {
                  updateTab(item);
                  setOpenMenu(false);
                }}
              >
                {item}
              </li>
            );
          }
        })}
      </ul>
    </nav>
  );
};

export default Navbar;
