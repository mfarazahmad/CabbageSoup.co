import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'antd/dist/reset.css';

import homeicon from '../../../images/home.webp'
import pinkhome from '../../../images/homepink.webp'

import ordersicon from '../../../images/orders.webp'
import exiticon from '../../../images/exit.webp'
import orderpink from '../../../images/orderspink.webp'
import logo from '../../../images/logo.webp'
import profilepic from '../../../images/contact_img.webp'

import OrderHistory from './OrderHistory';
import ViewModifyAccount from './ViewModifyAccount'
import { getUserName } from '../../../service/auth';

function SettingsOutline(props: any) {

    const [chartType, setChartType] = useState("orderHistory")
    const [username, setUsername] = useState("")

    const navigate = useNavigate();

    useEffect(() => {
        verifyLogin();
    }, []);

    const verifyLogin = async () => {
        let user = await getUserName();
        if (user) {
            setUsername(user.user_name);
            if (user.user_type === 'admin') {
                //setAdmin(true);
            }
        }
    }

    const whichChart = (type: any) => {
        setChartType(type)
    }

    const handleHome = (e: any) => {
        console.log(e);
        navigate('/')
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
                                <div className="pannelicondescription">Orders </div>
                            </div>
                        ) : (
                            <div>
                                <img src={homeicon} className="pannelicons" onClick={() => whichChart('orderHistory')} />
                                <div className="pannelicondescription">Orders </div>
                            </div>
                        )}
                        {chartType === 'orders' ? (
                            <div>
                                <img src={orderpink} className="pannelicons" />
                                <div className="pannelicondescription">Account </div>
                            </div>
                        ) : (
                            <div>
                                <img src={ordersicon} className="pannelicons" onClick={() => whichChart('account')} />
                                <div className="pannelicondescription">Account </div>
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
                            {chartType === 'orderHistory' && (
                                <OrderHistory />
                            )}
                            {chartType === 'account' && (
                                <ViewModifyAccount />
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}


export default SettingsOutline;