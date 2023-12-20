import { useState } from "react";
import { AppContext } from "./context";

export const AuthContextProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState();
    const [userCredentials, setUserCredentials] = useState({ username: "", email: "" });
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    return <AppContext.Provider value={{
        accessToken,
        setAccessToken,
        userCredentials,
        setUserCredentials,
        isAuthenticated,
        setIsAuthenticated
    }}>
        {children}
    </AppContext.Provider>
};