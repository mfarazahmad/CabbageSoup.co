import React from 'react';
import { Routes, Route, useNavigate } from "react-router-dom";

import routes from '../../utils/navi';

function App(props:any) {

    const handleCart = props.handleCart;
    const handleLogin = props.handleLogin;

    const resetCart = props.resetCart;
    const cartData = props.cartData;
    const cartTotal = props.cartTotal;
    const totalQty = props.totalQty;

    const navigate = useNavigate();
    
    const handleDetailPage = (e:any) => {
        console.log(e);
        navigate('/product', { state: { product: e } });
    };

    return (
        <div className='app'>
            <div className="pageContainer">
                <Routes>
                    {routes.map(
                        ({ exact, path, Component, startProps }, key) => {
                            return <Route
                                path={path}
                                key={key}
                                element={<Component {...props} totalQty={totalQty} cartTotal={cartTotal} cartData={cartData} resetCart={resetCart} handleLogin={handleLogin} handleCart={handleCart} handleDetailPage={handleDetailPage} start={startProps} />}
                            />
                        }
                    )}
                </Routes>
            </div>
        </div>
    );
}


export default App;