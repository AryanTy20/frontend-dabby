import React from "react";

type setItemProps = string;

const useLocalStorage = () => {
  const setLocalUser = (value: setItemProps) => {
    localStorage.setItem("user", value);
  };
  const getLocalUser = () => {
    return localStorage.getItem("user");
  };
  const deleteLocalUser = () => {
    localStorage.removeItem("user");
  };

  return { setLocalUser, getLocalUser, deleteLocalUser };
};

export default useLocalStorage;
