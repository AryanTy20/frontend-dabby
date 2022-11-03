import { useContext } from "react";
import { userContext } from "../context/userContext";

export const useUserContext = () => {
  return useContext(userContext);
};
