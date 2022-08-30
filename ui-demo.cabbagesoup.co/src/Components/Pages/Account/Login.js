import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { Button, Input } from 'antd';
import { UserOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

const LoginBox =  (props) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUserName = e => {console.log(e.target.value); setUsername(e.target.value);};
    const handlePassword = e => {console.log(e.target.value); setPassword(e.target.value);};
    
    return (
        <div className="loginWidget">
            <Input onChange={handleUserName} placeholder="Username" prefix={<UserOutlined />} />
            <br />
            <Input.Password
                onChange={handlePassword}
                placeholder="Password"
                iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            />
            <br />
            <Button className="changeBtn" onClick={() => {
                props.handleLogin({'type':'login', 'user_name': username, 'password':password});
                props.history.push('/');
                }}>Login</Button>
            <br />
        </div>
    );
}


export default withRouter(LoginBox);