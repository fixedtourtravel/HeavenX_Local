import React, { useContext, createContext, useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import { TOKEN_ID } from "../utils/constants";
import * as ROUTES from "../constants/routes";

const AuthContext = createContext(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const history = useHistory();
  const location = useLocation();

  const GetTokenSetUser = () => {
    let tokenid = localStorage.getItem(TOKEN_ID);

    if (tokenid && !user) {
      history.push(location);
      axios({
        method: "get",
        url: `${ROUTES.BASELINK}/api/auth/user/${tokenid}`,
      }).then((result) => {
        if (result.data.success) {
          setUser(result.data.data);
          history.push(location);
        } else {
          history.push("/");
        }
      });
    }
  };

  useEffect(() => {
    if (!user) {
      GetTokenSetUser();
    }
  }, []);

  const login = (user, jwttoken) => {
    setUser(user);
    localStorage.setItem(TOKEN_ID, jwttoken);
  };

  const logout = () => {
    try {
      setUser(null);
      localStorage.removeItem(TOKEN_ID);
      history.push("/login");
    } catch (err) {
      throw err;
    }
  };

  const value = {
    user,
    setUser,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
