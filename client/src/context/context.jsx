import { createContext } from "react";

export const AppContext = createContext({
    // authentication
    accessToken: "",
    setAccessToken: () => { },
    userCredentials: { email: "", password: "" },
    setUserCredentials: () => { },
    isAuthenticated: false,
    setIsAuthenticated: () => { }
});

