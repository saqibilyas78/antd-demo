import './App.css';
import { Space, Table, Button } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { add, remove } from './account'

function App() {

  const dispatch = useDispatch();
  const accounts = useSelector((state) => state.account.accounts);
  const count = useSelector((state) => state.account.count);

  const add_account = () => {

    const obj = {
      key: count,
      action : '',
      name: 'John Brown',
      type: 32,
      category: 'New York No. 1 Lake Park',
      status: 'New York No. 1 Lake Park',
      note: 'New York No. 1 Lake Park',
    }

    dispatch(add(obj))
  }

  const columns = [
    {
      title: 'Account Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => add_account()}>+Add</a>
        </Space>
      ),
    },
    {
      title: 'Account Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Account Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Use Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Note',
      dataIndex: 'note',
      key: 'note',
    },
  ];

  const btnStyle = {
    float: 'right',
  };
  return (
    <div className="App">
        {(accounts.length == 0 ? <Button type="primary" onClick={() => add_account()} style={btnStyle}>Add First Account</Button> : (''))}
        <Table columns={columns} dataSource={accounts} />
    </div>
  );
}

export default App;

