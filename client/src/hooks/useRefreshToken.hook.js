import { useContext } from "react";
import { AppContext } from "../context/context";
import { privateAPI } from "../api/axios";
async function useRefreshToken() {
    const { setAccessToken } = useContext(AppContext);
    const refresh = async () => {
        const response = await privateAPI.get("/auth/refresh");
        const { status, refresh_token } = response.data;
        if (status !== "success") {
            throw new Error("Something went wrong while fetching access_token");
        };
        setAccessToken(refresh_token);
    };
    return refresh;
};

export default useRefreshToken;