
import React, { Suspense, lazy, useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import { Table, Space, Input, Button } from 'antd';
import 'antd/dist/antd.css';

import { useCSVReader } from 'react-papaparse';


function ViewModifyInventory(props) {

  const { Column, ColumnGroup } = Table;
  const [productData, setProductData] = useState("")
  const [searchValue, setSearchValue] = useState("")
  const { Search } = Input;
  const [count, setCount] = useState(0)
  const [originalData, setOrginalData] = useState("")

  useEffect(() => {
    getProducts()
  }, []);

  const { CSVReader } = useCSVReader()

  const getProducts = async () => {
    try {
      let response = await axios.get(`${process.env.REACT_APP_SERVICE_PRODUCTS}/query/product`);
      console.log(response['data'])

      let output = [];
      let data = response['data']['data'];
      for (let i = 0; i < data.length; i++) {
        let product = {};
        product['key'] = i;
        product['product_name'] = data[i]['product_name'];
        product['price'] = data[i]['price'];
        product['quantity'] = data[i]['quantity'];
        product['product_id'] = data[i]['product_id'];
        output.push(product);
      }
      console.log(output);
      setProductData(output);
      setOrginalData(output);

    } catch (err) {
      console.log(err);
    }
  }

  const onChange = (e) => {
    setSearchValue(e.target.value);
    console.log(searchValue);
  }

  const filterTable = () => {
    console.log(searchValue)
    if (searchValue != "") {
      setProductData(originalData.filter(obj => obj.product_name === searchValue || obj.price === searchValue || obj.quantity === searchValue));
    } else {
      setProductData(originalData);
    }
  }

  const buttonRef = React.createRef()

  const handleOpenDialog = (e) => {
    // Note that the ref is set async, so it might be null at some point
    if (buttonRef.current) {
      buttonRef.current.open(e);
    }
  }


  const handleOnFileLoad = (data) => {
    let headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    };
    for (let i = 1; i < data.length; i++) {
      let new_product = { "product_name": data[i].data[0], "price": data[i].data[1], "quantity": data[i].data[2], "product_id": data[i].data[3] };
      const endpoint = process.env.REACT_APP_ANALYTICS_ENGINE + "/query/product";
      axios.post(URL, new_product, headers)
        .then((response) => {
          console.log(response)
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  const handleOnError = (err, file, inputElem, reason) => {
    console.log(err)
  }

  const handleOnRemoveFile = (data) => {
    console.log('---------------------------')
    console.log(data)
    console.log('---------------------------')
  }

  const handleRemoveFile = (e) => {
    // Note that the ref is set async, so it might be null at some point
    if (buttonRef.current) {
      buttonRef.current.removeFile(e)
    }
  }

  const handleDelete = (record) => {
    const endpoint = process.env.REACT_APP_ANALYTICS_ENGINE + `/query/product/${record.product_id}`
    let headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization",
      "crossorigin": true
    }
    axios.delete(url, headers)
      .then((response) => {
        console.log("SUCCESS")
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div>
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
      <Table className="inventoryChart" dataSource={productData} pagination={{ defaultPageSize: 10, showSizeChanger: true, size: 'small', onShowSizeChange: true, pageSizeOptions: ['10', '20', '50', '100'] }} scroll={{ y: 400 }}>
        <Column title="Product" dataIndex="product_name" />
        <Column title="Price" dataIndex="price" />
        <Column title="Quantity" dataIndex="quantity" />
        <Column
          title="Action"
          key="action"
          render={(text, record) => (
            <Space size="middle">
              <a onClick={(record) => handleDelete(record)} >Delete</a>
            </Space>
          )}
        />
      </Table>
      <Suspense fallback={<div>Loading...</div>}>
        <CSVReader
          ref={buttonRef}
          onFileLoad={handleOnFileLoad}
          onError={handleOnError}
          noClick
          noDrag
          onRemoveFile={handleOnRemoveFile}
          config={{
            quotes: false, //or array of booleans
            quoteChar: '"',
            escapeChar: '"',
            delimiter: ",",
            header: false,
            newline: "{",
            skipEmptyLines: false, //or 'greedy',
            columns: null //or array of strings

          }}
        >
          {({ file }) => (
            <aside
              style={{
                display: 'flex',
                flexDirection: 'row',
                marginBottom: 10,
                justifyContent: 'space-evenly'
              }}
            >
              <Button
                type='button'
                onClick={handleOpenDialog}
                style={{
                  borderRadius: 0,
                  marginLeft: 0,
                  marginRight: 0,
                  paddingLeft: 20,
                  paddingRight: 20,
                  paddingTop: 6,
                  borderRadius: 6
                }}
              >
                Browse file
              </Button>
              <div
              >
                {file && file.name}
              </div>
              <Button
                style={{
                  borderRadius: 0,
                  marginLeft: 0,
                  marginRight: 100,
                  paddingLeft: 20,
                  paddingRight: 30,
                  paddingTop: 6,
                  borderRadius: 6
                }}
                onClick={handleRemoveFile}
              >
                Remove
              </Button>
            </aside>
          )}
        </CSVReader>
      </Suspense>
    </div>
  );

}


export default withRouter(ViewModifyInventory);