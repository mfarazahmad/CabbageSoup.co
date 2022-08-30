import React, {Suspense, lazy, useState, useEffect } from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import axios from 'axios';

import Navbar from '../Navbar/Navbar';
import Loader from './Loader';
import Footer from './Footer';
import App from './App';

const MessengerCustomerChat = lazy(() => import('react-messenger-customer-chat'));

/*
state:  Context: Loading        
        Menu:  menuOpen -> transform: translateX(0%);

        Menu: style-> values menuOpen | ''
        Loading: style -> values loading | ''
*/

 const Container = (props) => {

    const [isLoading, setIsLoading] = useState(false);

    const [cartData, setCart] = useState([]);
    const [totalQty, setTotalQty] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    const [loggedIn, setLoggedIn] = useState(false);
    const [shouldLoadFB, setFB]  = useState(false);

    useEffect(() => {
        const endpoint = process.env.REACT_APP_ANALYTICS_ENGINE + '/query/getCart';
        const headers = {"withCredentials": "true"};
        axios.get(endpoint, headers)
        .then(response => {
            console.log(response);
            let data = response['data']['data'];
            if (data) {
                setCart(data['cartData']);
                if (data['cartTotal'] < 0) {
                    setCartTotal(0);
                } else {
                    setCartTotal(data['cartTotal']);
                }
                setTotalQty(data['totalQty']);
            }
        })
        .catch(err => {
            console.log(err);
        });
      }, []);

    const handleCart = e => {
        // Create/ Update Cart
        let productExists = false;
        let tempTotal = cartTotal;
        let tempQty = totalQty;
        let currentItemQty = 1;

        if (tempQty === 0 && e.action === "delete") {
            window.location.reload();
        }
        console.log(e);
        let newCart = cartData;

        // Edits cart for existing products
        for (let i=0; i < newCart.length; i++) {
            let currentProduct = newCart[i];
            if (e.product_name === currentProduct.product_name) {
                if (e.action === "delete") {
                    currentProduct.quantity -= 1;
                    currentItemQty = currentProduct.quantity
                    tempQty -= 1;
                    if (currentProduct.quantity === 0) {
                        newCart.splice(i, 1);
                    } 
                    tempTotal -= +e.price;
                    console.log(tempTotal);
                    if (tempTotal < 0) {
                        tempTotal = 0;
                    }
                } else {
                    currentProduct.quantity += 1;
                    tempQty += 1;
                    tempTotal += +e.price;
                }

                productExists = true;
        
                break;
            } else {
                continue;
            }
        }

        // Edits cart for non existing products
        if (!productExists) {
            tempTotal += +e.price;
            tempQty += 1;

            let newProduct = {
                key: '1',
                quantity: 1,
                product_id: e.product_id,
                product_category: e.product_category,
                product_brand: e.product_brand,
                product_name:  e.product_name,
                img:  e.img,
                price: e.price,
                user_name: '',
                order_date: '',
                order_number: '',
                order_status: 'Preparing',
                shipping_status: ''
            };
            
            newCart = [...newCart, newProduct];
        }


        tempTotal = parseFloat(tempTotal.toLocaleString('fullwide', {useGrouping:false, maximumSignificantDigits:6}));

        // Save cart to User Session
        const endpoint = process.env.REACT_APP_ANALYTICS_ENGINE + '/query/saveCart';
        const headers = {"withCredentials": "true"};
        axios.post(endpoint,{'cartData': newCart, 'cartTotal': tempTotal, 'totalQty': tempQty}, headers)
        .then(response => {
            console.log(response);
            setCart(newCart);
            setCartTotal(tempTotal);
            setTotalQty(tempQty);
        })
        .then(() => {
            if (currentItemQty === 0) {
                window.location.reload();
            }
        })
        .catch(err => {
            console.log(err);
        });
    };

    const handleLogin = (e) => { 
        console.log(e);
        setIsLoading(true);
        if (e.type === 'login') {
            const endpoint = process.env.REACT_APP_ANALYTICS_ENGINE + '/query/login';
            const headers = {"withCredentials": "true"};
            axios.post(endpoint, {'user_name': e.user_name, 'password': e.password}, headers)
            .then(response => {
                console.log(response);
                if (response.data.err === '') {
                    setLoggedIn(true);
                }
                setIsLoading(false);
            })
            .catch(err => {
                console.log(err);
                setIsLoading(false);
            });
        } else if (e.type === 'logout') {
            const endpoint = process.env.REACT_APP_ANALYTICS_ENGINE + '/query/logout';
            const headers = {"withCredentials": "true"};
            axios.get(endpoint, headers)
            .then(response => {
                console.log(response);
                setLoggedIn(false);
                setIsLoading(false);
            })
            .catch(err => {
                console.log(err);
            });
        }
    };

    const resetCart = () => {
        console.log('Resetting Cart');
        // Save cart to User Session
        const endpoint = process.env.REACT_APP_ANALYTICS_ENGINE + '/query/saveCart';
        const headers = {"withCredentials": "true"};
        axios.post(endpoint,{'cartData': [], 'cartTotal': 0, 'totalQty': 0}, headers)
        .then(response => {
            console.log(response);
            setCart([]);
            setCartTotal(0);
            setTotalQty(0);
        })
        .then(() => {
            //window.location.reload();
        })
        .catch(err => {
            console.log(err);
        });
    }

    return (
        <div className={`outer`}>
            <Router>
                <Navbar totalQty={totalQty} loggedIn={loggedIn}  />
                
                {isLoading && <Loader /> }

                <Suspense fallback={<Loader /> }>
                    { shouldLoadFB && (
                    <MessengerCustomerChat
                        pageId="104211655131227"
                        appId={process.env.REACT_APP_FB_APP_ID }
                    /> )
                    }
                </Suspense>

                <App 
                    setLoading={setIsLoading} 
                    cartData={cartData} 
                    cartTotal={cartTotal}
                    totalQty={totalQty}
                    handleCart={handleCart}
                    handleLogin={handleLogin}
                    resetCart={resetCart}
                />  
                <Footer />
            </Router>
        </div>
    );
}

export default Container;