import React, { useState, useEffect } from 'react';


import { Table, Input, InputNumber, Popconfirm, Form, Typography } from 'antd';
import 'antd/dist/reset.css';
import { getUserName } from '../../../service/auth';
import { getUserAccount, updateUserAccount } from '../../../service/user';
import { Account } from '../../../models/account';

const ViewModifyAccount = () => {

  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState('');
  const [data, setData] = useState<Account[]>([]);
  const [user_name, setUsername] = useState<string>("");

  useEffect(() => {
    getAccount();
  }, []);

  const getAccount = async () => {
    try {
      let accountInfo;
      let userData = await getUserName();
      if (userData) accountInfo = await getUserAccount(userData['user_name']);

      setUsername(userData['user_name']);
      if (accountInfo) setData(accountInfo);
      else {
        console.log("Failed to get account!");
      }
    } catch(err) {
        console.log(err);
    }
  }

  const isEditing = (record: any) => record.key === editingKey;

  const edit = (record: any) => {
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

  const save = async (key: 'name' | 'city' | 'street' | 'zip') => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item[key]);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row as Account });
        setData(newData);
        setEditingKey('');
      } else {
        newData.push(row as Account);
        setData(newData);
        setEditingKey('');
      }

      let response = await updateUserAccount(user_name, newData[0])
      if (!response) {
        console.log("Failed to update account!");
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const columns = [
    {
      title: 'Name',
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
      render: (_: any, record: any) => {
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
      onCell: (record: any) => ({
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
  }:any) => {
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

export default ViewModifyAccount;