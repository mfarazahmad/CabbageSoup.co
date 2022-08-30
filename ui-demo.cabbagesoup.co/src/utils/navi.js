import React from 'react';

import Home from '../Components/Pages/Home/Home';
import ProductDetail from '../Components/Pages/Product/ProductDetail';
import ProductDisplay from '../Components/Pages/Product/ProductDisplay';
import Checkout from '../Components/Pages/Checkout/Checkout';
import Cart from '../Components/Pages/Checkout/Cart';

import SettingsOutline from '../Components/Pages/Settings/SettingsOutline';
import CreateAccount from "../Components/Pages/Account/CreateAccount";
import ViewModifyAccount from "../Components/Pages/Settings/ViewModifyAccount";
import OrderHistory from '../Components/Pages/Settings/OrderHistory';
import OrderTracking from '../Components/Pages/Settings/OrderTracking';

import DashboardOutline from "../Components/Pages/Dashboard/DashboardOutline";
import SendEmail from '../Components/Widgets/SendEmail';
import AnalyticsCharts from '../Components/Pages/Dashboard/Analytics/AnalyticsCharts';

const routes = [
    {exact: true,   path:'/',                                        Component: Home,                     startProps:{} },
    {exact: false,  path:'/product',                                 Component: ProductDetail,            startProps:{} },
    {exact: false,  path:'/results',                                 Component: ProductDisplay,           startProps:{} },
    {exact: true,   path:'/settings',                                Component: SettingsOutline,                 startProps:{} },
    {exact: false,  path:'/settings/create-account',                 Component: CreateAccount,            startProps:{} },
    {exact: true,   path:'/settings/order-history',                  Component: OrderHistory,             startProps:{} },
    {exact: true,   path:'/settings/order-tracking',                 Component: OrderTracking,            startProps:{} },
    {exact: false,  path:'/settings/edit-account',                   Component: ViewModifyAccount,        startProps:{} },
    {exact: false,  path:'/cart',                                    Component: Cart,                     startProps:{} },
    {exact: false,  path:'/checkout',                                Component: Checkout,                 startProps:{} },
    {exact: false,  path:'/email',                                   Component: SendEmail,                startProps:{} },
    {exact: true,   path:'/dashboard',                               Component: DashboardOutline,                startProps:{} },
    {exact: true,   path:'/analyticsChart',                          Component: AnalyticsCharts,           startProps:{} }

];

export default routes;