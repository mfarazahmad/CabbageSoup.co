import React, { useState, useEffect, lazy, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import 'antd/dist/reset.css';

import { getUserName } from '../../../service/auth';

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

const Dashboard = lazy(() => import('./Dashboard'));
const OrderChart = lazy(() => import('./ViewOrders'));
const CustomerChart = lazy(() => import('./ViewCustomers'));
const InventoryChart = lazy(() => import('./ViewModifyInventory'));

function DashboardOutline(props:any) {

    const [chartType, setChartType] = useState("analytics")
    const [username, setUsername] = useState("")
    const [profileImg, setProfileImg] = useState("")

    const navigate = useNavigate();

    useEffect(() => {
        verifyLogin();
    }, []);

    const verifyLogin = async () => {
        let user = await getUserName();
        if (user) {
            setUsername(user.user_name);
            setProfileImg(user.user_img);
            if (user.user_type === 'admin') {
                //setAdmin(true);
            }
        }
    }

    const whichChart = (type:any) => {
        setChartType(type)
    }

    const handleHome = (e: any) => {
        console.log(e);
        navigate('/');
    };

    return (
        <main className="page" id="dashboardoutline">
            <section className="mainDisplay">
                <img className="dashboardlogo" referrerPolicy="no-referrer" src={profileImg}></img>
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
                            navigate('/');
                        }}
                        />
                    </div>
                    <div className="rightpannel">
                        <div className="charts">
                            {chartType === 'analytics' && (
                                <Suspense fallback='<div>Loading...</div>'>
                                    <Dashboard />
                                </Suspense>
                            )}
                            {chartType === 'orders' && (
                                <Suspense fallback='<div>Loading...</div>'>
                                    <OrderChart />
                                </Suspense>
                            )}
                            {chartType === 'inventory' && (
                                <div id="inventoryChart">
                                    <Suspense fallback='<div>Loading...</div>'>
                                        <InventoryChart />
                                    </Suspense> 
                                </div>
                            )}
                            {chartType === 'customer' && (
                                <Suspense fallback='<div>Loading...</div>'>
                                    <CustomerChart />
                                </Suspense>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}


export default DashboardOutline;