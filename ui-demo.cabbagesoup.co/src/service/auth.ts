import axios from "axios";
import { AuthCheck } from "../models/auth";

export async function getUserName():Promise<AuthCheck> {
    let endpoint = `${process.env.REACT_APP_SERVICE_AUTH}/auth/check`;
    const headers = {headers: { "withCredentials": "true" }};
    
    let response = await axios.get(endpoint, headers);
    console.log(response);

    let userData = response['data']['data'];
    console.log(userData);

    return userData;
}