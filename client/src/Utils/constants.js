import axios from "axios";

const BASE_URL = "http://localhost:8000"
export const API = axios.create({ baseURL: BASE_URL });

async function checkAuth(AuthData) {
    try {
        const response = await API.post("/auth/checkLogin", AuthData);
        return response?.status;
    } catch (error) {
        console.log(error);
    }
}

export async function checkAuthHandler(AuthData, router) {
    try {
        const status = await checkAuth(AuthData);
        if (status != 200 || status == "undefined"){
            router.push("/Auth");
        }
    } catch (error) {
        console.log(error);
    }
}