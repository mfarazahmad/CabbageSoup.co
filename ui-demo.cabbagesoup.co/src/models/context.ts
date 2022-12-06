import React, {createContext} from 'react';
import { App } from './app';

export const AppContext = createContext<App>(
    {   
        showLoading: () => null,
        showAlert: (show: boolean, type:"success" | "error" | "info" | "warning" | undefined, message:string, description:string) => null,
        handleCart: () => null,
        handleLogin: () => null,
        resetCart: () => null,
        cartData: [],
        cartTotal: 0,
        totalQty: 0,
    }
);