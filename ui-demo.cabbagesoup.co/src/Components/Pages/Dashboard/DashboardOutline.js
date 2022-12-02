import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { Map } from 'pigeon-maps'

import { Table, Input, Pagination } from 'antd';
import 'antd/dist/antd.css';

import homeicon from '../../../images/home.webp'
import pinkhome from '../../../images/homepink.webp'

import inventoryicon from '../../../images/inventory.webp'
import customericon from '../../../images/customer.webp'
import ordersicon from '../../../images/orders.webp'
import exiticon from '../../../images/exit.webp'
import orderpink from '../../../images/orderspink.webp'
import customerpink from '../../../images/customerpink.webp'
import inventorypink from '../../../images/inventory_pink.webp'
import logo from '../../../images/logo.webp'
import profilepic from '../../../images/contact_img.webp'

import InventoryChart from './ViewModifyInventory.js'
import CustomerChart from './ViewCustomers.js'
import OrderChart from './ViewOrders.js'
import Dashboard from './Dashboard';

function DashboardOutline(props) {

    const [chartType, setChartType] = useState("analytics")
    const [username, setUsername] = useState("")

    useEffect(() => {
        const endpoint = `${process.env.REACT_APP_SERVICE_AUTH}/auth/check`;
        const headers = { "withCredentials": "true" };
        axios.get(endpoint, headers)
            .then(response => {
                console.log(response);
                let data = response['data']['data'];
                if (data) {
                    setUsername(data.user_name);
                    if (data.user_type === 'admin') {
                        //setAdmin(true);
                    }
                }
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    const whichChart = (type) => {
        setChartType(type)
    }

    const handleHome = e => {
        console.log(e);
        props.history.push({
            pathname: '/',
        })
    };

    return (
        <main className="page" id="dashboardoutline">
            <section className="mainDisplay">
                <img className="dashboardlogo" src={logo}></img>
                <div>
                    <div className="dashboardheadingtitle"> Hi {username} </div>
                    <div className="dashboardheadingsubheading">Welcome Back</div>
                </div>
                <img className="profilepic" src={profilepic}></img>
            </section>
            <section className="dashboardlayout">
                <div className="pannels">
                    <div className="leftpannel">
                        <div className="emptydivpannel"> </div>
                        {chartType === 'analytics' ? (
                            <div>
                                <img src={pinkhome} className="pannelicons" />
                                <div className="pannelicondescription">Home </div>
                            </div>
                        ) : (
                            <div>
                                <img src={homeicon} className="pannelicons" onClick={() => whichChart('analytics')} />
                                <div className="pannelicondescription">Home </div>
                            </div>
                        )}
                        {chartType === 'orders' ? (
                            <div>
                                <img src={orderpink} className="pannelicons" />
                                <div className="pannelicondescription">Orders </div>
                            </div>
                        ) : (
                            <div>
                                <img src={ordersicon} className="pannelicons" onClick={() => whichChart('orders')} />
                                <div className="pannelicondescription">Orders </div>
                            </div>

                        )}
                        {chartType === 'inventory' ? (
                            <div>
                                <img src={inventorypink} className="pannelicons" />
                                <div className="pannelicondescription">Inventory</div>
                            </div>
                        ) : (
                            <div>
                                <img src={inventoryicon} className="pannelicons" onClick={() => whichChart('inventory')} />
                                <div className="pannelicondescription">Inventory</div>
                            </div>

                        )}
                        {chartType === 'customer' ? (
                            <div>
                                <img src={customerpink} className="pannelicons" />
                                <div className="pannelicondescription">Customers</div>
                            </div>
                        ) : (
                            <div>
                                <img src={customericon} className="pannelicons" onClick={() => whichChart('customer')} />
                                <div className="pannelicondescription">Customers</div>
                            </div>

                        )}
                        <img src={exiticon} className="pannelicons exit" onClick={() => {
                            props.handleLogin({ 'type': 'logout' });
                            props.history.push('/');
                        }}
                        />
                    </div>
                    <div className="rightpannel">
                        <div className="charts">
                            {chartType === 'analytics' && (
                                <Dashboard />
                            )}
                            {chartType === 'orders' && (
                                <OrderChart />
                            )}
                            {chartType === 'inventory' && (
                                <div id="inventoryChart">
                                    <InventoryChart />
                                </div>
                            )}
                            {chartType === 'customer' && (
                                <CustomerChart />
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}


export default withRouter(DashboardOutline);