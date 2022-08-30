
import React, {useState, useEffect} from 'react';
import { withRouter, Link } from 'react-router-dom';
import axios from 'axios';
import emailjs from 'emailjs-com';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { Input, Result } from 'antd';
import { CreditCardOutlined, CalendarOutlined, MailOutlined } from '@ant-design/icons';

import paypal from '../../../images/paypal.svg';
import visa from '../../../images/visa.svg';
import mastercard from '../../../images/mastercard.webp';

const orderPart = (amt) => {
    let randomPart = '';
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    
    for (var i=0; i < amt; i++) {
        let generated = [];
        generated.push(alphabet[Math.floor(Math.random() * alphabet.length)]);
        generated.push(Math.floor(Math.random() * 9));
       
        let randomChoice = generated[Math.floor(Math.random() * generated.length)]
        randomPart += randomChoice;
    }

    return randomPart;
}

const generateOrder = () => {
    let orderNumber = ``;

    orderNumber += orderPart(7) + '-';
    orderNumber += orderPart(3) + '-';
    orderNumber += orderPart(3) + '-';
    orderNumber += orderPart(4) + '-';
    orderNumber += orderPart(11);

    console.log(orderNumber);

    return orderNumber;
}

const Checkout = (props) => { 

    const cartTotal = props.location.state.cartTotal;
    const cartData = props.location.state.cartData;

    const [orderNum, setOrder] = useState('');
    const [userInfo, setUserInfo] = useState({});
    const [displaySuccess, showSuccess] = useState(false);

    useEffect(() => {
        const endpoint = process.env.REACT_APP_ANALYTICS_ENGINE + '/query/checkAuth';
        const headers = {"withCredentials": "true"};
        axios.get(endpoint, headers)
        .then(response => {
            console.log(response);
            let data = response['data']['data'];
    
            const endpoint2 = process.env.REACT_APP_ANALYTICS_ENGINE + `/query/customer?user_name=${data['user_name']}`;
            axios.get(endpoint2, headers)
            .then(resp => {
                    console.log(resp);
                    var data = resp['data']['data'][0];
                    console.log(data['email'])
                    setUserInfo(data);
            })
            .catch(err => {
                console.log(err);
            });
        })
        .catch(err => {
            console.log(err);
        });
      }, []);
    
    const handleSuccess = (e) => {
        e.preventDefault();    //This is important, i'm not sure why, but the email won't send without it
        
        // Send Email
        emailjs.sendForm('service_043g1zh', 'template_vcmtc2r', e.target, 'user_AmjGhJszTUZRIJPVX68aS')
        .then((result) => {
              console.log(result);
              console.log("Sent Email!");
        })
        .catch( (err) => {
              console.log(err.text);
        });

        // Save Order to DB
        const endpoint = process.env.REACT_APP_ANALYTICS_ENGINE + '/query/checkAuth';
        const headers = {"withCredentials": "true"};
        axios.get(endpoint, headers)
        .then(response => {
            console.log(response);
            let data = response['data']['data'];

            const order = generateOrder();
            var currentDate = new Date();
    
            let orderDetails = cartData;
            for (var i=0; i < orderDetails.length; i++) {
                orderDetails[i]['order_date'] = currentDate.toString();
                orderDetails[i]['order_number'] = order;
                orderDetails[i]['user_name'] = data['user_name'];
            }

            const endpoint2 = process.env.REACT_APP_ANALYTICS_ENGINE + '/query/orders';
            axios.post(endpoint2, orderDetails, headers)
            .then((response) => {
                console.log(response);
                setOrder(order);
                showSuccess({displaySuccess: !displaySuccess });
                props.resetCart();
            })
            .catch(err => {
                console.log(err);
            });
        })
        .catch(err => {
            console.log(err);
        });
      }

      const handlePaypal = () => {
        window.location.href = "https://paypal.com";
      }

    if (displaySuccess) {
        return (
            <main className="page" id="checkout">
                <Result
                    status="success"
                    title="Successfully purchased your items!"
                    subTitle= {`Order number: ${orderNum}.`}
                /> 
            </main>
        );
    } else {

    return (
        
        <main className="page" id="checkout">
            <section className="mainDisplay">

                <div id="orderDetails" className="formBox">
                    <div className="review">
                        <h2 id="title">Order Review</h2>
                        <div className="productDetails">
                        {cartData.map((item) => 
                            <div className='product_container'>
                                <LazyLoadImage className="productImg" onClick={() => props.handleDetailPage(item)} src={'https://www.cabbagesoup.co/images/' + item.img} /> 
                                <div className='product_price'>{item.quantity} x {item.price}</div>
                                <div className='product_name'>{item.product_name}</div>
                            </div>
                        )}
                        </div>
                        <br/>
                    </div>

                    {userInfo.street ? (
                        <div id="userInfo">
                            <div className="review">
                                <h2 id="title">Shipping</h2>
                                <div className="address" >
                                    <Input disabled value={userInfo.street} placeholder="Address" />
                                </div>
                                    <Input disabled value={userInfo.state} placeholder="State" />
                                    <Input disabled value={userInfo.zip}  placeholder="Zip" />
                            </div>

                            <div className="review">
                                <LazyLoadImage className="paymentImg" src={mastercard} />
                                <LazyLoadImage className="paymentImg" src={visa} />
                                <LazyLoadImage className="paymentImg" onClick={handlePaypal} src={paypal} />
                                <div className="popoutCardInfo">
                                    <h2 id="title">Card Info</h2>
                                    <div> 
                                        <MailOutlined /> | 
                                        <Input disabled value={userInfo.email}  placeholder="Email" />
                                    </div>
                                    <div>
                                        <CreditCardOutlined /> | 
                                        <Input  disabled value={userInfo.credit_card_number} placeholder="Card #" />
                                    </div>
                                    <div>
                                        <CalendarOutlined /> | 
                                        <Input placeholder="Exp Date" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div id="userInfo">
                            <div className="review">
                                <h2 id="title">Shipping</h2>
                                <div className="address" >
                                    <Input placeholder="Address" />
                                </div>
                                    <Input placeholder="State" />
                                    <Input placeholder="Zip" />
                            </div>

                            <div className="review payment">

                                <LazyLoadImage className="paymentImg" src={mastercard} />
                                <LazyLoadImage className="paymentImg" src={visa} />
                                <LazyLoadImage className="paymentImg" onClick={handlePaypal}  src={paypal} />

                                <div className="popoutCardInfo">
                                    <h2 id="title">Card Info</h2>
                                    <div> 
                                        <MailOutlined /> | 
                                        <Input placeholder="Email" />
                                    </div>
                                    <div>
                                        <CreditCardOutlined /> | 
                                        <Input placeholder="Card #" />
                                    </div>
                                    <div>
                                        <CalendarOutlined /> | 
                                        <Input placeholder="Exp Date" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                    }

                    <h3>Total: $<span className="totalPrice">{cartTotal}</span></h3>
                </div>

                <form className="contact-form" onSubmit={handleSuccess}  >
                    <input type="hidden" name="contact_number" />
                    <input type="hidden" name="subject" value="New Order" />
                    <input type="hidden" name="to_name" value="Cabbage Soup Employees" />
                    <input type="hidden" name="Customer_Name" value="Haris Warsi" />
                    <input type="hidden" name="order_total" value={cartTotal} />
                    {cartData.map((item, count) => 
                        <input key={count} type="hidden" name="order" value={item.product_name} />
                    )}
                    <div className="buttonBox">
                        <button type="submit" > Process Purchase</button>
                    </div>
                </form>

            </section>
        </main>
    );

    }
}


export default withRouter(Checkout);