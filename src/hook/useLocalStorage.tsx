import React from "react";

type setItemProps = string;

const useLocalStorage = () => {
  const setUser = (value: setItemProps) => {
    localStorage.setItem("user", value);
  };
  const getUser = () => {
    return localStorage.getItem("user");
  };
  const deleteUser = () => {
    localStorage.removeItem("user");
  };

  return [setUser, getUser, deleteUser];
};

export default useLocalStorage;
