import axios from 'axios';
import { Account } from '../models/account';


export const getUserAccount = async (username: string, email?: string) => {
    let args = `?user_name=${username}`;
    if (email) args = `?email=${email}`;
    const endpoint = `${process.env.REACT_APP_SERVICE_CUSTOMER}/query/customer${args}`;
    const headers = {headers: { "withCredentials": "true" }};

    let response = await axios.get(endpoint, headers);
    let accountInfo = response["data"]["data"];
    console.log(accountInfo);

    return accountInfo;
}

export const saveUserAccount = async (user: { username: string, email: string, password: string }) => {
    const endpoint = `${process.env.REACT_APP_SERVICE_CUSTOMER}/query/customer`;
    let headers = { headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', } };
    
    let response = await axios.post(endpoint, user, headers)
    let respData = response['data']['data'];
    console.log(respData);

    return response
}

export const updateUserAccount = async (username: string, data: Account) => {
    const endpoint = `${process.env.REACT_APP_SERVICE_CUSTOMER}/query/customer/${username}`
    const headers = {headers: { "withCredentials": "true" }};

    let response = await axios.put(endpoint, data, headers);
    let respData = response['data']['data'];
    console.log(respData);

    return respData;
}