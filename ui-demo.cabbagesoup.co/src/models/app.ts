import { MouseEventHandler } from "react";
import { Product } from "./cart";

export type App = {
    showLoading: MouseEventHandler<HTMLElement>,
    showAlert: Function,
    handleCart: MouseEventHandler<HTMLElement>,
    handleLogin: MouseEventHandler<HTMLElement>,
    resetCart: MouseEventHandler<HTMLElement>,
    cartData: Product[],
    cartTotal: number,
    totalQty: number,
}