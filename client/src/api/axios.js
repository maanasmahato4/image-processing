import axios from "axios";

export const publicAPI = axios.create({
    baseURL: "http://localhost:3000/api"
});