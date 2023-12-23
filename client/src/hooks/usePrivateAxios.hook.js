import { useContext, useEffect } from "react";
import { AppContext } from "../context/context";
import useRefreshToken from "../hooks/useRefreshToken.hook";
import { privateAPI } from "../api/axios";

async function useAxiosPrivate() {
    const { accessToken, setAccessToken } = useContext(AppContext);
    const refresh = useRefreshToken();

    useEffect(() => {
        try {
            const requestInterceptor = privateAPI.interceptors.request.use(config => {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${accessToken}`;
                };
                return config;
            }, (error) => Promise.reject(error));

            const responseInterceptor = privateAPI.interceptors.response.use(
                response => response,
                (error) => {
                    const previousRequest = error?.config;
                    if (error?.response?.status == 403 || !previousRequest.sent) {
                        previousRequest.sent = true;
                        const access_token = refresh();
                        setAccessToken(access_token);
                        previousRequest.headers['Authorization'] === `Bearer ${access_token}`;
                        return privateAPI(previousRequest);
                    };
                    return Promise.reject(error);
                }
            );

            return () => {
                privateAPI.interceptors.request.eject(requestInterceptor);
                privateAPI.interceptors.response.eject(responseInterceptor);
            };
            
        } catch (error) {
            console.error(error);
        };
    }, [accessToken, refresh])
};

export default useAxiosPrivate;