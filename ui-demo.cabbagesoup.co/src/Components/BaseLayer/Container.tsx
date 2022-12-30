import React, { Suspense, lazy, useState, useEffect } from 'react';
import { BrowserRouter as Router } from "react-router-dom";

import Navbar from '../Navbar/Navbar';
import Loader from './Loader';
import Footer from './Footer';
import App from './App';

import { Product, Tracker } from "../../models/cart";
import { PopupAlert } from '../../models/alert';

import { modifyExistingProductToCart, addNewProductToCart, getUserCart, saveUserCart } from "../../service/cart";
import { logUserIn, logUserOut } from '../../service/auth';
import axios from 'axios';

const CustomAlert = lazy(() => import('../Widgets/Alert'))

const Container = () => {

    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [alertMsg, setDisplayDetails] = useState<PopupAlert>({
        show: false,
        type: undefined,
        message: "",
        description: "",
    });

    const [cartData, setCart] = useState<Product[]>([]);
    const [totalQty, setTotalQty] = useState<number>(0);
    const [cartTotal, setCartTotal] = useState<number>(0);

    useEffect(() => {
        axios.defaults.withCredentials = true;
        getCart();
    }, []);

    const getCart = async () => {
        try {
            let data = await getUserCart();
            console.log(data);
            if (data.err === '' && data.data) {
                data = data.data
                setCart(data['cartData']);
                if (data['cartTotal'] < 0) {
                    setCartTotal(0);
                } else {
                    setCartTotal(data['cartTotal']);
                }
                setTotalQty(data['totalQty']);
            } else {
                console.log("Cart is emtpy!");
            }
        } catch (err) {
            console.log(err);
            //showAlert(true, 'error', "Error", "Failed to load cart!");
        }
    }

    let saveCart = async (newCart: Product[], tracker: Tracker) => {
        console.log('Saving Cart');
        try {
            let response = saveUserCart(newCart, tracker);
            if (!response) {
                console.log("Failed to save cart!")
            }

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

            let response = await saveUserCart([], {'exists':false, 'currentItemQty': 0, 'total': 0, 'totalQty': 0 })
            if (!response) {
                console.log('Failed to reset cart!')
            }
            
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
                let response = await logUserIn({ 'user_name': e.user_name, 'password': e.password });
                if (response.data.err === '') setLoggedIn(true);
                setIsLoading(false);

            } else if (e.type === 'logout') {
                let respData = await logUserOut();
                if (!respData) {
                    console.log("Failed to log user out!");
                } else {
                    setLoggedIn(false);
                    setIsLoading(false);
                }
            }
        } catch (err) {
            console.log(err);
            setIsLoading(false);
            showAlert(true, 'error', "Error", "Failed to handle login/logout");
        }
    };

    const refreshLogin = (isLoggedIn: any) => {
        setLoggedIn(isLoggedIn);
    }

    const showLoading = () => {
        setIsLoading(!isLoading);
    }

    const showAlert = (show: boolean, type:"success" | "error" | "info" | "warning" | undefined, message:string, description:string) => {
        setDisplayDetails({show, type, message, description});
    }

    const closeAlert = () => {
        setDisplayDetails({show: false, type:undefined, message:"", description:""})
    }

    return (
        <div className={`outer`}>
            <Router>
                <Navbar 
                    totalQty={totalQty} 
                    loggedIn={loggedIn} 
                    showAlert={showAlert}
                    refreshLogin={refreshLogin}
                />

                {isLoading && <Loader />}
                
                <Suspense fallback={<div>Loading...</div>}>
                    <CustomAlert 
                        show={alertMsg.show} 
                        type={alertMsg.type} 
                        message={alertMsg.message} 
                        description={alertMsg.description} 
                        closeAlert={closeAlert} 
                    />
                </Suspense>

                <App {...{ 
                        showLoading, showAlert, getCart, handleCart, handleLogin, resetCart, 
                        cartData, cartTotal, totalQty}
                    }
                />

                <Footer />
            </Router>
        </div>
    );
}

export default Container;