import { createContext, useContext, useEffect, useState } from "react";
import {
  createEcommerceDb,
  onAuthStateChangedFunction,
} from "../utils/firebase";

const UserContext = createContext();
const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const signOff = onAuthStateChangedFunction((user) => {
      setCurrentUser(user);
      if (user) {
        createEcommerceDb(user);
      }
    });
    return signOff;
  }, []);
  const values = { currentUser, setCurrentUser };
  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};

const useUserGlobalContext = () => {
  return useContext(UserContext);
};
export { UserProvider, useUserGlobalContext };
