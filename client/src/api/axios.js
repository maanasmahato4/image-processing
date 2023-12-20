import axios from "axios";

export const publicAPI = axios.create({
    baseURL: "http://localhost:3000/api"
});

export const privateAPI = axios.create({
    baseURL: "http://localhost:3000/api",
    headers: {
        Authorization: `Bearer ${null}`,
    },
    withCredentials: true
});