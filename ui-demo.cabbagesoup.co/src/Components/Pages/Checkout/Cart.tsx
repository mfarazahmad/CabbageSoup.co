import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Table, Space, Button, Empty } from 'antd';

const Cart =  (props:any) => {

  const columns = [
    {
      title: 'Image',
      dataIndex: 'img',
      key: 'img',
      render: (text: string, record: any) => <LazyLoadImage onClick={() => props.handleDetailPage(record)} src={'https://www.cabbagesoup.co/images/' + text} />,
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (text: any, record: any) => (
        <Space size="middle">
          <Button onClick={() => {
              var itemData = {'product_name': record.product_name, 'action': 'delete', 'price': record.price };
              props.handleCart(itemData);
            }}>-</Button>
            <div>{text}</div>
          <Button onClick={() => {
              var itemData = {'product_name': record.product_name, 'action': 'add', 'price': record.price };
              props.handleCart(itemData);
            }}>+</Button>
        </Space>
      ),
    },
    {
      title: 'Product',
      dataIndex: 'product_name',
      key: 'product_name',
      render: (text: any, record: any) => <a onClick={() => props.handleDetailPage(record)}>{text}</a>,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Subtotal',
      key: 'subtotal',
      render: (text: any, record: any) => (
        <Space size="middle">
          {parseFloat((record.price * record.quantity).toLocaleString('fullwide', {useGrouping:false, maximumSignificantDigits:6}))
          }
        </Space>
      ),
    },
  ];

  const navigate = useNavigate();

  const handleCheckout = (e: any) => {
    console.log(e);
    navigate('/checkout', {state: { cartData: props.cartData, cartTotal: props.cartTotal }});
  };
  
  return (
    <main className="page" id="shoppingcart">
    <section className="mainDisplay">

      <div className="cartDetails">
        <Link to={{pathname: "/"}}>
          <h6 className='backLink'><span>&#8592;</span> back to home page</h6>
        </Link>
        <div className="shopping">
            <div className="cartTitle">
              <h3 style={{'color': 'black'}}>Cart</h3>
              <h3>{props.totalQty} items</h3>
            </div>
            {props.cartData ? 
                <Table 
                    columns={columns} 
                    dataSource={props.cartData} 
                /> :
                <Empty />
            }
            <h2 style={{'color': 'black'}}>Total: <span id="cartTotal">${props.cartTotal}</span></h2>
            <Button type="primary" className='checkoutBtn' onClick={handleCheckout}>Checkout</Button>
        </div>
      </div>

    </section>
  </main>
  );
}


export default Cart;