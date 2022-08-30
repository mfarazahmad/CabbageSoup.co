
import React, {useState, useEffect} from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import {Table, List, Space, Badge, Input } from 'antd';

const columns = [
    {
      title: 'Order Number',
      dataIndex: 'order_number',
      key: 'order_number',
      render: item => <div className="order_number"><strong>{item}</strong></div>
    },
    {
        title: 'Order Data',
        dataIndex: 'order_date',
        key: 'order_date',
      },
    {
      title: 'Products',
      dataIndex: 'products',
      key: 'products',
      render: item => <List
            id="productList"
            itemLayout="horizontal"
            dataSource={item}
            renderItem={item => (
                <List.Item>
                    {item}
                </List.Item>
            )}
        />
    },
    {
        title: 'Shipping Status',
        dataIndex: 'shipping_status',
        key: 'shipping_status',
    },
    {
        title: 'Order Status',
        dataIndex: 'order_status',
        key: 'order_status',
    },
    {
        title: 'Total',
        dataIndex: 'total',
        key: 'total',
        render: (text, record) => (
          <div id="totalPrice">
          {parseFloat(record.total.toLocaleString('fullwide', {useGrouping:false, maximumSignificantDigits:6}))
          }
          </div>
        )
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a disabled>Reorder</a>
        </Space>
      ),
    },
  ];
  
function OrderHistory(props) {

  const [orderData, setOrderData] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [originalData, setOrginalData] = useState("");

  const { Search } = Input;

  useEffect(() => {
    const endpoint = process.env.REACT_APP_ANALYTICS_ENGINE + '/query/checkAuth';
    const headers = {"withCredentials": "true"};
    axios.get(endpoint, headers)
    .then(response => {
        console.log(response);
        let data = response['data']['data'];

        const endpoint2 = process.env.REACT_APP_ANALYTICS_ENGINE + `/query/orders?user_name=${data['user_name']}`;
        axios.get(endpoint2, headers)
        .then(resp => {
                console.log(resp);
                var data = resp['data']['data'];

                let uniqueOrders = {};
                for (var i=0; i < data.length; i++) {
                  let orderNumber = data[i]['order_number'];
                  if (!(orderNumber in uniqueOrders)) uniqueOrders[orderNumber] = '';
                }
    
                let orders = [];
                for (const orderNum in uniqueOrders ) {
                  let products = [];
                  let total = 0;
                  let shipping_status = '';
                  let order_date = '';
                  let order_status = '';
    
                  for (i=0; i < data.length; i++) {
                    let currentOrder = data[i]['order_number'];
    
                    if (currentOrder === orderNum) {
                      products.push(data[i]['product_name']);
                      total += parseFloat(data[i]['price']);
                      order_date = data[i]['order_date'];
                      order_status = data[i]['order_status'];

                      shipping_status = data[i]['shipping_status'];
                      if (shipping_status === 'In Transit') shipping_status = <Badge color="yellow" text="In transit" />;
                      else if  (shipping_status === 'Canceled') shipping_status = <Badge color="red" text="Canceled" />;
                      else shipping_status = <Badge color="green" text="Done" />;
                    } 
                  }
                  let orderDetails = {  'order_number': orderNum, 'order_date': order_date,
                                        'shipping_status': shipping_status,'order_status' :  order_status,
                                        'total': total, 'products': products
                                      };
                  orders.push(orderDetails);
                }
                console.log(orders);
                setOrderData(orders);
                setOrginalData(orders);
        })
        .catch(err => {
            console.log(err);
        });
    })
    .catch(err => {
        console.log(err);
    });
  }, []);

  const onChange = (e) => {
    setSearchValue(e.target.value)
    console.log(searchValue)
}

const filterTable = () => {
    console.log(searchValue)
    if (searchValue !== "") {
        setOrderData(orderData.filter(obj => obj.order_number === searchValue || obj.product_name === searchValue || obj.order_data === searchValue || obj.shipping_status === searchValue || obj.order_status === searchValue ))
        } else {
            setOrderData(originalData )
        }
    }

    return (
      <div id="" className="viewCustomeTable">
        <Search
          placeholder=""
          allowClear
          enterButton="Search"
          size="large"
          style={{ width: 300 }}
          onChange={onChange}
          onSearch={filterTable}
          value={searchValue}
          className="searchbarDashboardTable"
        />
          
        <Table  className="chartBackground" id="orderTable" dataSource={orderData} columns={columns}  pagination={{ defaultPageSize: 10, showSizeChanger: true, size: 'small', onShowSizeChange:true, pageSizeOptions: ['10', '20', '50', '100'] }} scroll={{ y: 400 }}/>
      </div>
    );
}


export default withRouter(OrderHistory);