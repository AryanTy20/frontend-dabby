import React, { useEffect } from "react";
import useLocalStorage from "../../hook/useLocalStorage";
import "./style.scss";

const HomePage = () => {
  const [setLocalUser, getLocalUser, deleteLocalUser] = useLocalStorage();
  useEffect(() => {}, []);

  return <div>HomePage</div>;
};

export default HomePage;
