
import React, { createRef, Suspense, useState, useEffect } from 'react';

import { Table, Space, Input, Button } from 'antd';
import 'antd/dist/reset.css';

import { useCSVReader } from 'react-papaparse';
import { Product } from '../../../models/cart';
import { deleteProduct, getAllProducts, saveProduct } from '../../../service/product';

const { Column } = Table;
const { Search } = Input;

function ViewModifyInventory() {

  const [productData, setProductData] = useState<Product[]>([])
  const [originalData, setOrginalData] = useState<Product[]>([])
  const [searchValue, setSearchValue] = useState("")
  const [count, setCount] = useState(0)

  const { CSVReader } = useCSVReader()
  const buttonRef = createRef<any>()

  useEffect(() => {
    getProducts()
  }, []);

  const getProducts = async () => {
    try {
      let data = await getAllProducts();
      if (!data) {
        console.log('Error retreving products!')
      }
      
      let output = [];
      for (let i = 0; i < data.length; i++) {
        let product:any = {};
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

  const onChange = (e: any) => {
    setSearchValue(e.target.value);
    console.log(searchValue);
  }

  const filterTable = () => {
    console.log(searchValue)
    if (searchValue != "") {
      setProductData(originalData.filter(obj => 
        obj.product_name === searchValue || 
        String(obj.price) === searchValue || 
        String(obj.quantity) === searchValue
      ));
    } else {
      setProductData(originalData);
    }
  }


  const handleOpenDialog = (e: any) => {
    // Note that the ref is set async, so it might be null at some point
    if (buttonRef.current) {
      buttonRef.current.open(e);
    }
  }


  const handleOnFileLoad = async (data: any) => {
    for (let i = 1; i < data.length; i++) {
      let newProduct = { "product_name": data[i].data[0], "price": data[i].data[1], "quantity": data[i].data[2], "product_id": data[i].data[3] };
      let response = await saveProduct(newProduct);
      if (!response) {
        console.log("Error saving Product!");
      }
    }
  }

  const handleOnError = (err: any) => {
    console.log(err)
  }

  const handleOnRemoveFile = (data: any) => {
    console.log('---------------------------')
    console.log(data)
    console.log('---------------------------')
  }

  const handleRemoveFile = (e: any) => {
    // Note that the ref is set async, so it might be null at some point
    if (buttonRef.current) {
      buttonRef.current.removeFile(e)
    }
  }

  const handleDelete = (record: any) => {
    let response = deleteProduct(record.product_id);
    if (!response) {
      console.log("Error deleting product!")
    }
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
      <Table className="inventoryChart" dataSource={productData} pagination={{ defaultPageSize: 10, showSizeChanger: true, size: 'small', pageSizeOptions: ['10', '20', '50', '100'] }} scroll={{ y: 400 }}>
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
          {({ file }:any) => (
            <aside
              style={{
                display: 'flex',
                flexDirection: 'row',
                marginBottom: 10,
                justifyContent: 'space-evenly'
              }}
            >
              <Button
                onClick={handleOpenDialog}
                style={{
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


export default ViewModifyInventory;