export type Tracker = {
    'exists': boolean,
    'total': number,
    'totalQty': number,
    'currentItemQty': number
}

export type Product = {
    key: string,
    quantity: number,
    product_id: number,
    product_category: string,
    product_brand: string,
    product_name: string,
    img: string,
    price: number,
    user_name: string,
    order_date: string,
    order_number: string,
    order_status: string,
    shipping_status: string
}