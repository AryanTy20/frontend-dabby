import { createContext, useState } from "react";

type userType = {
  name: String;
};
type contextChildrenType = {
  children: React.ReactNode;
};
interface Icontext {
  user: userType | null;
  setUser: React.Dispatch<React.SetStateAction<userType | null>>;
}
export const userContext = createContext<Icontext>({} as Icontext);

export const ContextProvider = ({ children }: contextChildrenType) => {
  const [user, setUser] = useState<userType | null>(null);

  return (
    <userContext.Provider value={{ user, setUser }}>
      {children}
    </userContext.Provider>
  );
};

export default ContextProvider;
