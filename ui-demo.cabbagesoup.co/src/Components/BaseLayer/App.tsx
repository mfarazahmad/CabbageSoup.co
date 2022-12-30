import React, {useEffect} from 'react';
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";

import routes from '../../utils/navi';

function App(props:any) {

    const handleCart = props.handleCart;
    const handleLogin = props.handleLogin;

    const getCart = props.getCart;

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
                                element={<ScrollToTop> <Component {...props} getCart={getCart} totalQty={totalQty} cartTotal={cartTotal} cartData={cartData} resetCart={resetCart} handleLogin={handleLogin} handleCart={handleCart} handleDetailPage={handleDetailPage} start={startProps} /> </ScrollToTop>}
                            />
                        }
                    )}
                </Routes>
            </div>
        </div>
    );
}

function ScrollToTop({children}: any) {
    const { pathname } = useLocation();
  
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);
  
    return <>{children}</>;
  }


export default App;