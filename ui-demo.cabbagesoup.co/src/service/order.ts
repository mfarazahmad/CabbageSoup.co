import axios from "axios";

export const getUserOrder = async (username: string) => {
    const endpoint = `${process.env.REACT_APP_SERVICE_HISTORY}/query/orders?user_name=${username}`;
    const headers = {headers: { "withCredentials": "true" }};
    let response = await axios.get(endpoint, headers);
    console.log(response);
    let data = response['data']['data'];
    return data;
}