import axios from "axios";
import { AuthCheck, NewAuth } from "../models/auth";

export const getUserName = async():Promise<AuthCheck> => {
    axios.defaults.withCredentials = true;
    const endpoint = `${process.env.REACT_APP_SERVICE_AUTH}/auth/check`;

    let response = await axios.get(endpoint);
    console.log(response);

    let data = response['data']['data'];
    return data;
}

export const saveUserCredentials = async(user: NewAuth) => {
    const endpoint = `${process.env.REACT_APP_SERVICE_AUTH}/auth/create`;
    const headers = { headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', } };
    
    let response = await axios.post(endpoint, user, headers)
    let respData = response['data']['data'];
    console.log(respData);

    return response
}

export const logUserIn = async (payload: any) => {
    const endpoint = `${process.env.REACT_APP_SERVICE_AUTH}/auth/login`;
    const headers = { headers: { "withCredentials": "true" } };

    let response = await axios.post(endpoint, payload, headers);
    console.log(response);

    return response
}

export const oauthUserLogin = async () => {
    axios.defaults.withCredentials = true;
    const endpoint: string | Location = `${process.env.REACT_APP_SERVICE_AUTH}/auth/oauth`;
    (<any> window).location = endpoint;
}

export const oauthCallBack = async (payload: any) => {
    axios.defaults.withCredentials = true;
    // Save auth login to User Session
    const endpoint = `${process.env.REACT_APP_SERVICE_AUTH}/auth/oauth/callback`;

    let response = await axios.post(endpoint, payload)
    console.log(response);

    return response
}

export const logUserOut = async () => {
    axios.defaults.withCredentials = true;
    const endpoint = `${process.env.REACT_APP_SERVICE_AUTH}/auth/logout`;

    let response = await axios.get(endpoint);
    let respData = response['data']['msg'];

    return respData
}