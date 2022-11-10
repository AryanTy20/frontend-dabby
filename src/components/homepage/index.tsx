import React, { useState } from "react";
import Home from "../home";
import Navbar from "../navbar";
import Search from "../search";
import Upload from "../upload";

const HomePage = () => {
  const [activeTab, setActiveTab] = useState({
    allImg: true,
    uploadImg: false,
    searchImg: false,
  });

  return (
    <>
      <Navbar setActiveTab={setActiveTab} />
      {activeTab.allImg && <Home />}
      {activeTab.uploadImg && <Upload />}
      {activeTab.searchImg && <Search />}
    </>
  );
};

export default HomePage;
