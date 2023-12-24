import { jwtDecode } from "jwt-decode";

export function decodeToken(access_token) {
    try {
        const creds = jwtDecode(access_token);
        return creds;
    } catch (error) {
        console.error(error);
    };
};