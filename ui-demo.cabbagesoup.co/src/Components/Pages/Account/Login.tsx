import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, Input } from 'antd';
import { UserOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import googleIcon from '../../../images/google-auth.svg';
import { oauthUserLogin } from '../../../service/auth';

const LoginBox =  (props: any) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const navigate = useNavigate();

    const handleUserName = (e:any) => {console.log(e.target.value); setUsername(e.target.value);};
    const handlePassword = (e:any) => {console.log(e.target.value); setPassword(e.target.value);};
    
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
                navigate('/');
                }}>Login</Button>
            <br />
            <Button 
                icon={ <img style={{"height": "20px", "marginRight": "10px"}} src={googleIcon} alt="Google Logo" />} 
                onClick={() => oauthUserLogin() }
            >
               Login with Google
            </Button>
        </div>
    );
}


export default LoginBox;