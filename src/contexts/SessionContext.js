import { createContext, useEffect, useState } from "react";
import { checkToken, apiBase } from "../utils/helper";

const SessionContext = createContext();

const SessionContextProvider = ({ children }) => {
  const [token, setToken] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({})

  const apiWithToken = apiBase(token)

  const authenticateUser = (responseToken) => {
    setToken(responseToken);
    localStorage.setItem("authToken", responseToken);
    setIsAuthenticated(true);
  };

  const verifyAuth = async () => {
    try {
      const tokenFromStorage = localStorage.getItem("authToken");
      const response = await checkToken(tokenFromStorage);
      if (response.errorMessage) {
        throw new Error();
      }
      setToken(tokenFromStorage);
      setIsAuthenticated(true);
    } catch (error) {
      localStorage.removeItem("authToken");
    }
  };

  
  const logout = () => {
    setToken()
    localStorage.removeItem('authToken')
    setIsAuthenticated(false)
    setUser()
  }

  const declareUser = user => {
    setUser(user)
  }

  useEffect(() => {
    verifyAuth();
  }, []);
  return (
    <SessionContext.Provider
      value={{ token, isAuthenticated, authenticateUser, declareUser, user, logout, apiWithToken }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export { SessionContext, SessionContextProvider };
