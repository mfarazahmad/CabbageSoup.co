import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Form, Input, Button } from 'antd';
import 'antd/dist/reset.css';

import Login from './Login';
import logo from '../../../images/logo.webp';
import loginBanner from '../../../images/loginBanner.svg';
import { getUserAccount, saveUserAccount } from '../../../service/user';

const CreateAccount = (props: any) => {
  const [showCreate, setShowCreate] = useState(true);
  const navigate = useNavigate();

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };

  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not a valid email!',
      number: '${label} is not a valid number!',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
  };

  const onFinish = async (values: { user: { username: string; email: string; password: string; }; }) => {

    try {
      const re = new RegExp("^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$");
      const isOk = re.test(values.user.password);
      console.log(isOk);

      if (!isOk || values.user.password.length >= 10) alert('Password needs to be 10 characters and at least capital letter!');

      const user_name = values.user.username;
      const email = values.user.email;

      let accountInfo = await getUserAccount(user_name);
      if (!accountInfo) {
        props.showAlert(true, 'error', "Error!", "Username already exists!");
      } else {
        let accountInfo = await getUserAccount("", email);

        if (!accountInfo) {
         props.showAlert(true, 'error', "Error!", "Email already exists!");
        } else {
          let respData = await saveUserAccount(values.user);
          if (respData) {
            props.showAlert(true, 'success', "Success!", "Successfully created user!");
            setTimeout(() => navigate('/'), 5000);
          }
          else {
            props.showAlert(true, 'error', "Error!", "Failed to create user!");
          }
        }
      }

      console.log(values);
      props.showAlert(true, 'error', "Error!", "Failed to create user!");

    } catch (err) {
      console.log(err);
      props.showAlert(true, 'error', "Error!", "Failed to create user!");
    }
  }

  const handleChange = () => {
    setShowCreate(!showCreate);
  }

  return (
    <main className="page" id="newAccount">
      <section className="mainDisplay">
        <div className="createAccount">
          {showCreate ? (
            <div className='msgWindow'>
              <img src={logo}></img>
              <h2>Create Account</h2>
              <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>

                <Form.Item
                  name={['user', 'name']}
                  label="Name"
                  rules={[{required: true}]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name={['user', 'email']}
                  label="Email"
                  rules={[{type: 'email', required: true}]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name={['user', 'username']}
                  label="Username"
                  rules={[{required: true, min: 5, message: 'Username must be minimum 5 characters.'}]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name={['user', 'password']}
                  label="Password"
                  rules={[{required: true, min: 10}]}
                >
                  <Input />
                </Form.Item>

                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 4 }}>
                  <Button className="changeBtn" type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              
              </Form>
            </div>
          ) : (
            <div className='bannerWindow'>
              <img src={loginBanner}></img>
              <h2>Welcome</h2>
              <p>If you don't have an account please sign up.</p>
              <button className="changeBtn" onClick={handleChange}>Sign Up</button>
            </div>
          )
          }
        </div>
        <div className="loginAccount">
          {showCreate ? (
            <div className='bannerWindow'>
              <img src={loginBanner}></img>
              <h2>Welcome Back</h2>
              <p>If you already have an account please login.</p>
              <button className="changeBtn" onClick={handleChange}>Log In</button>
            </div>
          ) :
            (
              <div className='msgWindow'>
                <img src={logo}></img>
                <h2>Sign In</h2>
                <Login handleLogin={props.handleLogin} />
              </div>
            )
          }
        </div>
      </section>
    </main>
  );
}

export default CreateAccount;