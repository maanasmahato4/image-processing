import { AppContext } from "./main.context"

export const ImageContextProvider = ({ children }) => {
    return <AppContext.Provider value={{}}>
        {children}
    </AppContext.Provider>
};