import React, { Suspense, lazy, useState, useEffect } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import axios from 'axios';

import Navbar from '../Navbar/Navbar';
import Loader from './Loader';
import Footer from './Footer';
import App from './App';

import { modifyExistingProductToCart, addNewProductToCart } from "../../service/cart";
import { Product, Tracker } from "../../models/cart";

// @ts-ignore
const MessengerCustomerChat = lazy(() => import('react-messenger-customer-chat'));

/*
state:  Context: Loading        
        Menu:  menuOpen -> transform: translateX(0%);

        Menu: style-> values menuOpen | ''
        Loading: style -> values loading | ''
*/

const Container = () => {

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [cartData, setCart] = useState<Product[]>([]);
    const [totalQty, setTotalQty] = useState<number>(0);
    const [cartTotal, setCartTotal] = useState<number>(0);

    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    const [shouldLoadFB, setFB] = useState<boolean>(false);

    useEffect(() => {
        getCart();
    }, []);

    const getCart = async () => {
        console.log('Getting Cart');
        try {
            const endpoint = `${process.env.REACT_APP_SERVICE_HISTORY}/query/cart`;
            const headers = { headers: { "withCredentials": "true" } };
            let response = await axios.get(endpoint, headers);
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
        } catch (err) {
            console.log(err);
        }
    }

    let saveCart = async (newCart: Product[], tracker: Tracker) => {
        console.log('Saving Cart');
        try {
            // Save cart to User Session
            const endpoint = `${process.env.REACT_APP_SERVICE_HISTORY}/query/cart`;
            const headers = { headers: { "withCredentials": "true" } };
            let payload = { 'cartData': newCart, 'cartTotal': tracker['total'], 'totalQty': tracker['totalQty'] };

            let response = await axios.post(endpoint, payload, headers)
            console.log(response);

            setCart(newCart);
            setCartTotal(tracker['total']);
            setTotalQty(tracker['totalQty']);

            setTimeout(() => {
                if (tracker['currentItemQty'] === 0) window.location.reload();
            }, 5000)

        } catch (err) {
            console.log(err);
        }
    }

    const resetCart = async () => {
        console.log('Resetting Cart');
        try {
            // Save cart to User Session
            const endpoint = `${process.env.REACT_APP_SERVICE_HISTORY}/query/cart`;
            const headers = { headers: { "withCredentials": "true" } };
            let response = await axios.post(endpoint, { 'cartData': [], 'cartTotal': 0, 'totalQty': 0 }, headers);
            console.log(response);

            setCart([]);
            setCartTotal(0);
            setTotalQty(0);

        } catch (err) {
            console.log(err);
        }
    }

    // Create | Update Cart
    const handleCart = (e: any) => {
        console.log(e);

        let tracker: Tracker = {
            'exists': false,
            'total': cartTotal,
            'totalQty': totalQty,
            'currentItemQty': 1
        }

        if (tracker['totalQty'] === 0 && e.action === "delete") {
            window.location.reload();
        }

        let newCart: Product[] = cartData;

        [newCart, tracker] = modifyExistingProductToCart(newCart, e, tracker);

        if (!tracker['exists']) {
            tracker['total'] += +e.price;
            tracker['totalQty'] += 1;

            let newProduct = addNewProductToCart(e)
            newCart = [...newCart, newProduct];
        }

        tracker['total'] = parseFloat(tracker['total'].toLocaleString('fullwide',
            { useGrouping: false, maximumSignificantDigits: 6 }));

        saveCart(newCart, tracker)
    };

    const handleLogin = async (e: any) => {
        console.log(e);

        try {
            setIsLoading(true);
            if (e.type === 'login') {
                const endpoint = `${process.env.REACT_APP_SERVICE_AUTH}/auth/login`;
                const headers = { headers: { "withCredentials": "true" } };
                let payload = { 'user_name': e.user_name, 'password': e.password };

                let response = await axios.post(endpoint, payload, headers);
                console.log(response);

                if (response.data.err === '') setLoggedIn(true);
                setIsLoading(false);

            } else if (e.type === 'logout') {
                const endpoint = `${process.env.REACT_APP_SERVICE_AUTH}/auth/logout`;
                const headers = { headers: { "withCredentials": "true" } };

                let response = await axios.get(endpoint, headers);
                console.log(response);

                setLoggedIn(false);
                setIsLoading(false);
            }
        } catch (err) {
            console.log(err);
            setIsLoading(false);
        }
    };

    return (
        <div className={`outer`}>
            <Router>
                <Navbar totalQty={totalQty} loggedIn={loggedIn} />

                {isLoading && <Loader />}

                <Suspense fallback={<Loader />}>
                    {shouldLoadFB && (
                        <MessengerCustomerChat
                            pageId="104211655131227"
                            appId={process.env.REACT_APP_FB_APP_ID}
                        />)
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