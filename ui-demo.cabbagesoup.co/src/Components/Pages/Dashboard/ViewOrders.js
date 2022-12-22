
import React, { useState, useEffect } from 'react';

import axios from 'axios';

import { Table, Input } from 'antd';
import 'antd/dist/reset.css';

function ViewOrders(props) { 
    const { Column } = Table;

    const [orderData, setOrderData] = useState("")
    const [searchValue, setSearchValue] = useState("")
    const { Search } = Input;
    const [originalData, setOrginalData] = useState("")

    useEffect(() => {
        console.log("HARIS")
        axios.get( process.env.REACT_APP_ANALYTICS_ENGINE + "/query/orders")
        .then((response) => {
            console.log(response['data']);
            let output = [];
            let data = response['data']['data'];
            for (let i = 0; i < data.length; i++) {
                let product = {};
                product['key'] = i;
                product['order_number'] = data[i]['order_number'];;
                product['product_name'] = data[i]['product_name'];
                product['order_date'] = data[i]['order_date'];;
                product['shipping_status'] = data[i]['shipping_status'];
                product['order_status'] = data[i]['order_status'];
                product['price'] = data[i]['price'];
                output.push(product);
            }
            setOrderData(output)
            setOrginalData(output)
        })
        .catch(err => {
            console.log(err);
        });
    },[]);
    
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
        <div className="viewCustomeTable">            
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
            <Table className="chartBackground" dataSource={orderData} pagination={{ defaultPageSize: 10, showSizeChanger: true, size: 'small', onShowSizeChange:true, pageSizeOptions: ['10', '20', '50', '100'] }} scroll={{ y: 400 }}>
                <Column title="Order Number" dataIndex="order_number"  />
                <Column title="Order Data" dataIndex="order_date" />
                <Column title="Products" dataIndex="product_name" />
                <Column title="Shipping Status" dataIndex="shipping_status"  />
                <Column title="Order Status" dataIndex="price" />
            </Table>
        </div>
    );

    }


export default ViewOrders;