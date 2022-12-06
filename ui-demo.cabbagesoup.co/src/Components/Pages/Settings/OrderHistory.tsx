
import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { Table, List, Space, Badge, Input } from 'antd';
import { getUserName } from '../../../service/auth';
import { Order } from '../../../models/order';
import { Product } from '../../../models/cart';
import { getUserOrder } from '../../../service/order';

const columns = [
  {
    title: 'Order Number',
    dataIndex: 'order_number',
    key: 'order_number',
    render: (item:number) => <div className="order_number"><strong>{item}</strong></div>
  },
  {
    title: 'Order Date',
    dataIndex: 'order_date',
    key: 'order_date',
  },
  {
    title: 'Products',
    dataIndex: 'products',
    key: 'products',
    render: (item: Product[] ) => <List
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
    render: (item: string) => {
      if (item === 'In Transit') return <Badge color="yellow" text="In transit" />;
      else if (item === 'Canceled') return <Badge color="red" text="Canceled" />;
      else return <Badge color="green" text="Done" />;
    }
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
    render: (_text: any, record: any) => (
      <div id="totalPrice">
        {parseFloat(record.total.toLocaleString('fullwide', 
          { useGrouping: false, maximumSignificantDigits: 6 }
        ))}
      </div>
    )
  },
  {
    title: 'Action',
    key: 'action',
    render: () => (
      <Space size="middle">
        <a >Reorder</a>
      </Space>
    ),
  },
];

function OrderHistory() {

  const [searchValue, setSearchValue] = useState("");
  const [orderData, setOrderData] = useState<Order[]>([]);
  const [originalData, setOrginalData] = useState<Order[]>([]);

  const { Search } = Input;

  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    try {
      let userData = await getUserName()
      let data = await getUserOrder(userData['user_name']);

      if (data) {
        let uniqueOrders = findUniqueOrders(data);

        let orders: Order[] = [];
        for (const order in uniqueOrders) {
          let orderDetails: Order;
          let matchedOrder = data.filter((obj: Order) => obj.order_number === order)
  
          if (matchedOrder.length != 0) {
            orderDetails = {
              'order_number': order, 
              'order_date': matchedOrder['order_date'],
              'shipping_status': matchedOrder['shipping_status'], 
              'order_status': matchedOrder['order_status'],
              'total': parseFloat(matchedOrder['price']), 
              'products':  [matchedOrder['product_name']]
            };
  
            orders.push(orderDetails);
          }
        }
  
        console.log(orders);
        setOrderData(orders);
        setOrginalData(orders);
      } else {
        console.log('Failed to load in Orders!')
      }
    } catch(err) {
        console.log(err);
    }
  }

  const onChange = (e: any) => {
    setSearchValue(e.target.value)
    console.log(searchValue)
  }

  const filterTable = () => {
    console.log(searchValue)
    if (searchValue !== "") {
      setOrderData(orderData.filter(obj => 
        obj.order_number === searchValue ||
        productFilter(obj.products, searchValue) ||
        obj.order_date === searchValue || 
        obj.shipping_status === searchValue || 
        obj.order_status === searchValue
        )
      )
    } else {
      setOrderData(originalData)
    }
  }

  const productFilter = (product: Product[], searchValue: string): boolean => {
    for (let i = 0; i < product.length; i++) return product[i]["product_name"] === searchValue
    return false
  }

  const findUniqueOrders = (data: any) => {
    let uniqueOrders: {[key: string]: string} = {};
    for (var i = 0; i < data.length; i++) {
      let orderNumber = data[i]['order_number'];
      if (!(orderNumber in uniqueOrders)) uniqueOrders[orderNumber] = '';
    }
    return uniqueOrders;
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

      <Table 
        className="chartBackground" 
        id="orderTable" 
        dataSource={orderData} 
        columns={columns} 
        scroll={{ y: 400 }}
        pagination={{ 
            defaultPageSize: 10, 
            showSizeChanger: true, 
            size: 'small',
            pageSizeOptions: ['10', '20', '50', '100'] 
        }} 
      />
    </div>
  );
}


export default withRouter(OrderHistory);