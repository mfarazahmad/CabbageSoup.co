
import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import { Table, Input } from 'antd';
import 'antd/dist/antd.css';

function ViewCustomers(props) { 

const { Column } = Table;

const [customerData, setCustomerData] = useState("")
const [searchValue, setSearchValue] = useState("")
const { Search } = Input;
const [originalData, setOrginalData] = useState("")

  useEffect(() => {
      axios.get( process.env.REACT_APP_ANALYTICS_ENGINE + "/query/customer")
      .then((response) => {
          console.log(response['data']);
          let output = [];
          let data = response['data']['data'];
          for (let i = 0; i < data.length; i++) {
              let product = {};
              product['key'] = i;
              product['address'] = `${data[i]['street']} ${data[i]['city']} ${data[i]['zip']}`;
              product['name'] = data[i]['name'];
              product['email'] = data[i]['email'];
              output.push(product);
          }
          setCustomerData(output)
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

  const onShowSizeChange = (current, pageSize) => {
    console.log(current, pageSize);
  }

  const filterTable = () => {
      console.log(searchValue)
      if (searchValue !== "") {
          setCustomerData(customerData.filter(obj => obj.name === searchValue || obj.email === searchValue || obj.address === searchValue ))
        } else {
            setCustomerData(originalData )
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
            <Table className="chartBackground"  dataSource={customerData} pagination={{ defaultPageSize: 10, showSizeChanger: true, size: 'small', onShowSizeChange:true, pageSizeOptions: ['10', '20', '50', '100'] }} scroll={{ y: 400 }}>
                <Column title="Full Name" dataIndex="name"  />
                <Column title="Email" dataIndex="email" />
                <Column title="Address" dataIndex="address" />
            </Table>
        </div>
    );

    }


export default withRouter(ViewCustomers);