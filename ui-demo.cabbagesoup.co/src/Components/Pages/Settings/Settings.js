
import React from 'react';
import { withRouter, Link } from 'react-router-dom';

import { List } from 'antd';
import { AimOutlined, AccountBookOutlined, SelectOutlined } from '@ant-design/icons';

function Settings(props) {

    const settingsData = [
        {
            title: "Edit Account",
            description: "Edit your account settings.",
            avatar: <AccountBookOutlined />,
            link: "/settings/edit-account"
        },
        {
            title: "Order History",
            description: "View your past and current orders.",
            avatar: <AimOutlined />,
            link: "/settings/order-history"
        },
        {
            title: "Order Tracking",
            description: "View the status of your last order in real time.",
            avatar: <AccountBookOutlined />,
            link: "/settings/order-tracking"
        },
        {
            title: <h4 onClick={() => props.handleLogin({'type':'logout'})}>Logout</h4>,
            description: <p onClick={() => props.handleLogin({'type':'logout'})}>Sign out of your account.</p>,
            avatar: <SelectOutlined onClick={() => props.handleLogin({'type':'logout'})} />,
            link: "/"
        },
    ];
    return (
        <main className="page" id="settings">
            <section className="mainDisplay">
                <h2>Account Settings</h2>
                <br />
                
                <div className="settingsBox">
                    <List
                        id="settingsList"
                        itemLayout="horizontal"
                        dataSource={settingsData}
                        renderItem={item => (
                            <Link to={item.link}>
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={item.avatar}
                                        title={item.title}
                                        description={item.description}
                                    />
                                </List.Item>
                            </Link>
                        )}
                    />
                    <br />
                    <div>
                    </div>
                </div>

                <p className="pageInfo">View your various account settings like notifications, password update, review billing info etc. For the purposes of this demo only a sample of basic ordering is shown here.</p>

            </section>
        </main>
    );
}


export default withRouter(Settings);