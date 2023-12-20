import { AppContext } from "./main.context";

export const AuthContextProvider = ({ children }) => {
    return <AppContext.Provider value={{}}>
        {children}
    </AppContext.Provider>
};