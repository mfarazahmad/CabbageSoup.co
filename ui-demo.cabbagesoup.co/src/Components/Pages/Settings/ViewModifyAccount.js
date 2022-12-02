import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import { Table, Input, InputNumber, Popconfirm, Form, Typography } from 'antd';
import 'antd/dist/antd.css';
import { getUserName } from '../../../service/auth';

const ViewModifyAccount = () => {

  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState('');
  const [data, setData] = useState([]);
  const [userName, setUsername] = useState<string>("")

  useEffect(() => {
    getAccount();
  }, []);

  const getAccount = async () => {
    try {
      let userData = await getUserName();
      console.log(userData)
      setUsername(userData['user_name'])

      const endpoint = `${process.env.REACT_APP_SERVICE_CUSTOMER}/query/customer?user_name=${userData['user_name']}`;
      const headers = {headers: { "withCredentials": "true" }};
      
      let response = await axios.get(endpoint, headers);
      let accountInfo = response["data"]["data"];
      console.log(accountInfo);

      let originData = [];

      for (let i = 0; i < 1; i++) {
        originData.push({
          name: accountInfo[i]["name"],
          street: accountInfo[i]["street"],
          city: accountInfo[i]["city"],
          zip: accountInfo[i]["zip"]
        });
      }
      setData(accountInfo);
    } catch(err) {
        console.log(err);
    }
  }

  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      name: '',
      street: '',
      city: '',
      zip: '',
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setData(newData);
        setEditingKey('');
        console.log(newData[0])
        const endpoint = process.env.REACT_APP_ANALYTICS_ENGINE + `/ query / customer / ${userName} `
        let headers = { "withCredentials": "true" };
        axios.put(url, newData[0], headers)
          .then(res => {
            console.log(res)
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
        console.log(newData[0])
        const endpoint = process.env.REACT_APP_ANALYTICS_ENGINE + `/ query / customer / ${userName} `
        let headers = { "withCredentials": "true" };
        axios.put(url, newData[0], headers)
          .then(res => {
            console.log(res)
          })
          .catch(err => {
            console.log(err);
          });
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const columns = [
    {
      title: 'name',
      dataIndex: 'name',
      width: '30%',
      editable: true,
    },
    {
      title: 'Street',
      dataIndex: 'street',
      width: '50%',
      editable: true,
    },
    {
      title: 'City',
      dataIndex: 'city',
      width: '20%',
      editable: true,
    },
    {
      title: 'Zip',
      dataIndex: 'zip',
      width: '20%',
      editable: true,
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <a
              href="javascript:;"
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </a>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
            Edit
          </Typography.Link>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  const editableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => {
    const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{
              margin: 0,
            }}
            rules={[
              {
                required: true,
                message: `Please Input ${title} !`,
              },
            ]}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  return (
    <div id="viewmodifyaccount">
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: editableCell,
            },
          }}
          bordered
          dataSource={data}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={{
            onChange: cancel,
          }}
        />
      </Form>
    </div>
  );
}

export default withRouter(ViewModifyAccount);