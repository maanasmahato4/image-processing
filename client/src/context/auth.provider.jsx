import { useEffect, useState } from "react";
import { AppContext } from "./context";
import { decodeToken } from "../helpers/decodeToken";

export const AuthContextProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState();
    const [userCredentials, setUserCredentials] = useState({ username: "", email: "" });
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        if (accessToken) {
            const getCredntials = new Promise((resolve, reject) => {
                const creds = decodeToken(accessToken);
                if (creds) {
                    resolve(creds);
                } else {
                    reject("no user credentials stored");
                };
            });

            getCredntials.then((creds) => {
                setUserCredentials({ ...userCredentials, username: creds.username, email: creds.email });
            }).catch((error) => {
                console.log(error);
            })
        };
    }, [accessToken]);

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