import React from 'react';
import { Switch, Route, withRouter } from "react-router-dom";

import routes from '../../utils/navi';

function App(props) {

    const handleCart = props.handleCart;
    const handleLogin = props.handleLogin;

    const resetCart = props.resetCart;
    const cartData = props.cartData;
    const cartTotal = props.cartTotal;
    const totalQty = props.totalQty;
    
    const handleDetailPage = e => {
        console.log(e);
        props.history.push({
            pathname: '/product',
            state: { product: e }
        })
    };

    return (
        <div className='app'>
            <div className="pageContainer">
                <Switch>
                    {routes.map(
                        ({ exact, path, Component, startProps }, key) => {
                            return <Route
                                exact={exact}
                                path={path}
                                key={key}
                                render={props => <Component {...props} totalQty={totalQty} cartTotal={cartTotal} cartData={cartData} resetCart={resetCart} handleLogin={handleLogin} handleCart={handleCart} handleDetailPage={handleDetailPage} start={startProps} />}
                            />
                        }
                    )}
                </Switch>
            </div>
        </div>
    );
}


export default withRouter(App);