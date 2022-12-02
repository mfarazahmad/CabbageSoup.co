import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import { Form, Input, Button } from 'antd';
import 'antd/dist/antd.css';

import Login from './Login';
import logo from '../../../images/logo.webp';
import loginBanner from '../../../images/loginBanner.svg';

const CreateAccount = (props) => {
  const [accountPassword, setAccountPassword] = useState("")
  const [showCreate, setShowCreate] = useState(true);

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

  const onFinish = async (values, event) => {

    try {
      const re = new RegExp("^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$");
      const isOk = re.test(accountPassword);
      console.log(isOk);

      if (!isOk || accountPassword.lenth >= 10) return alert('Password needs to be 10 characters and at least capital letter!');

      const user_name = values.user.username;
      const email = values.user.email;

      let response = await axios.get(`${process.env.REACT_APP_SERVICE_CUSTOMER}/query/customer?user_name=${user_name}`);
      if (response.data.data != null) {
        return alert("Username already exists");
      } else {
        let response = await axios.get(`${process.env.REACT_APP_SERVICE_CUSTOMER}/query/customer?email=${email}`);
        console.log(response);

        if (response.data.data != null) {
          return alert("Email already exists");
        } else {
          const endpoint = `${process.env.REACT_APP_SERVICE_CUSTOMER}/query/customer`;
          let headers = { headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', } };
          let response = await axios.post(endpoint, values.user, headers)
          console.log(response);
        }
      }

      console.log(values);

    } catch (err) {
      console.log(err);
    }
  }

  const onChange = (e) => {
    setAccountPassword(e.target.value)
    console.log(accountPassword)
  }

  const handleChange = () => {
    setShowCreate(showCreate => setShowCreate(!showCreate));
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
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name={['user', 'email']}
                  label="Email"
                  rules={[
                    {
                      type: 'email',
                      required: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name={['user', 'username']}
                  label="Username"
                  rules={[
                    {
                      required: true,
                      min: 5, message: 'Username must be minimum 5 characters.'
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name={['user', 'password']}
                  label="Password"
                  onChange={onChange}
                  rules={[
                    {
                      required: true,
                      min: 10,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 4 }}>
                  <button className="changeBtn" htmlType="submit">
                    Sign Up
                  </button>
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

export default withRouter(CreateAccount);