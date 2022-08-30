import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import { Table, Input, InputNumber, Popconfirm, Form, Typography } from 'antd';
import 'antd/dist/antd.css';

const ViewModifyAccount = (props) => { 

  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState('');
  const [data, setData] = useState([]);
  const [userName, setUsername] = useState("")

  useEffect(() => {

    const endpoint = process.env.REACT_APP_ANALYTICS_ENGINE + '/query/checkAuth';
    const headers = {"withCredentials": "true"};
    axios.get(endpoint, headers)
      .then(response => {
            console.log(response)
            let data = response['data']['data'];
            console.log(data)
            setUsername(data['user_name'])
            
          let url = process.env.REACT_APP_ANALYTICS_ENGINE + `/query/customer?user_name=${data['user_name']}`;
          axios.get(url, headers)
          .then(res => {
            var data = res["data"]["data"];
            console.log(data);

            let originData = [];

            for (let i = 0; i < 1; i++) {
              originData.push({
                name: data[i]["name"],
                street: data[i]["street"],
                city: data[i]["city"],
                zip: data[i]["zip"]
              });
            }
            setData(res["data"]["data"])
          })
          .catch(err => {
            console.log(err);
          });
      });
    },[]);

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
        let url = process.env.REACT_APP_ANALYTICS_ENGINE + `/query/customer/${userName}`
        let headers = {"withCredentials": "true"};
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
        let url = process.env.REACT_APP_ANALYTICS_ENGINE + `/query/customer/${userName}`
        let headers = {"withCredentials": "true"};
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
                message: `Please Input ${title}!`,
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