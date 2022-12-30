import axios from "axios"

export const getAllProducts = async (product_id?:string) => {
    let args = '';
    if (product_id) args = `?id=${product_id}`;

    let endpoint = `${process.env.REACT_APP_SERVICE_PRODUCTS}/query/product${args}`;
    axios.defaults.withCredentials = true;
    let response = await axios.get(endpoint);
    
    console.log(response)
    let data = response['data']['data'];

    return data;
    
}

export const getTopProducts = async (limit: number) => {
    let endpoint = `${process.env.REACT_APP_SERVICE_PRODUCTS}/query/product?limit=${limit}`;
    axios.defaults.withCredentials = true;
    let response = await axios.get(endpoint);
    
    console.log(response)
    let data = response['data']['data'];

    return data;
    
}

export const saveProduct = async (product: any) => {
    let endpoint = `${process.env.REACT_APP_SERVICE_PRODUCTS}/query/product`;
    axios.defaults.withCredentials = true;
    let response = await axios.post(endpoint, product);
    console.log(response)
    let data = response['data']['data'];

    return data;
}


export const deleteProduct = async (product_id: any) => {
    let endpoint = `${process.env.REACT_APP_SERVICE_PRODUCTS}/query/product/${product_id}`;
    axios.defaults.withCredentials = true;
    let response = await axios.delete(endpoint);
    console.log(response)
    let data = response['data']['data'];

    return data;
    
}