import { Tracker, Product } from "../models/cart";

// Edits cart for existing products
export function modifyExistingProductToCart(newCart:Product[], e: any, tracker: Tracker): [Product[], Tracker] {
    let match = newCart.filter(product => e.product_name === product.product_name);

    if (match.length === 0) return [newCart, tracker];
    else {
        let i = newCart.indexOf(match[0]);
        let currentProduct = newCart[i];

        if (e.action === "delete") {
            currentProduct.quantity -= 1;
            tracker['currentItemQty'] = currentProduct.quantity
            tracker['totalQty'] -= 1;
            tracker['total'] -= +e.price;

            if (currentProduct.quantity === 0) newCart.splice(i, 1);
            if (tracker['total'] < 0) tracker['total'] = 0;

        } else {
            currentProduct.quantity += 1;
            tracker['totalQty'] += 1;
            tracker['total'] += +e.price;
        }

        newCart[i] = currentProduct
        
        tracker['exists'] = true
        return [newCart, tracker]
    }
}

// Edits cart for non existing products
export function addNewProductToCart(e: any): Product {

    return {
        key: '1',
        quantity: 1,
        product_id: e.product_id,
        product_category: e.product_category,
        product_brand: e.product_brand,
        product_name: e.product_name,
        img: e.img,
        price: e.price,
        user_name: '',
        order_date: '',
        order_number: '',
        order_status: 'Preparing',
        shipping_status: ''
    };

}