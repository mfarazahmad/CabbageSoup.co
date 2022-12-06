import axios from "axios"

export const getAllProducts = async (product_id?:string) => {
    let args = '';
    if (product_id) args = `?id=${product_id}`;

    let endpoint = `${process.env.REACT_APP_SERVICE_PRODUCTS}/query/product${args}`;
    const headers = {headers: { "withCredentials": "true" }};
    let response = await axios.get(endpoint, headers);
    
    console.log(response)
    let data = response['data']['data'];

    return data;
    
}

export const getTopProducts = async (limit: number) => {
    let endpoint = `${process.env.REACT_APP_SERVICE_PRODUCTS}/query/product?limit=${limit}`;
    const headers = {headers: { "withCredentials": "true" }};
    let response = await axios.get(endpoint, headers);
    
    console.log(response)
    let data = response['data']['data'];

    return data;
    
}

export const saveProduct = async (product: any) => {
    let endpoint = `${process.env.REACT_APP_SERVICE_PRODUCTS}/query/product`;
    const headers = {headers: { "withCredentials": "true" }};
    let response = await axios.post(endpoint, product, headers);
    console.log(response)
    let data = response['data']['data'];

    return data;
}


export const deleteProduct = async (product_id: any) => {
    let endpoint = `${process.env.REACT_APP_SERVICE_PRODUCTS}/query/product/${product_id}`;
    const headers = {headers: { "withCredentials": "true" }};
    let response = await axios.delete(endpoint, headers);
    console.log(response)
    let data = response['data']['data'];

    return data;
    
}