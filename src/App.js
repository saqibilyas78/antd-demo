import './App.css';
import { Space, Table, Button, Modal ,Checkbox, Form, Input, Select, Switch} from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { add } from './account'
  
function App() {

  const dispatch = useDispatch();
  const accounts = useSelector((state) => state.account.accounts);
  const count = useSelector((state) => state.account.count);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [parent , set_parent] = useState(0);

  const add_account = (account) => {
    dispatch(add(account))
  }

  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 12 },
  };
  
   const showModal = (parent) => {
    set_parent(parent)
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      let status = values.status == true ? 'Yes' : 'No'
      const account = {
        key: count,
        action : '',
        name: values.name,
        type: values.type,
        category: values.category,
        status: status,
        note: values.note,
        parent : parent,
        children : []
      }
      console.log('Success:', account);
      add_account(account);
      setIsModalOpen(false);
      form.resetFields();
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
    
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const columns = [
    {
      title: 'Account Name',
      dataIndex: 'name',
      key: 'name',
      render: (value , record) => (<a>[{record.key}] {value}</a>),
    },
    {
      title: 'Action',
      key: 'action',
      render: (value, record) => (
        <Space size="middle">
          <a href='#' onClick={() => showModal(record.key)}>+Add</a>
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

  const types = [
    { label: 'Debit', value: 'Debit' },
    { label: 'Credit', value: 'Credit' },
  ];

  const category = [
    { label: 'Resource', value: 'Resource' },
    { label: 'Money', value: 'Money' },
  ];


  const onSelectChange = (newSelectedRowKeys) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: 'odd',
        text: 'Select Odd Row',
        onSelect: (changableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return false;
            }
            return true;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
      {
        key: 'even',
        text: 'Select Even Row',
        onSelect: (changableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return true;
            }
            return false;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
    ],
  };

  useEffect(() => {
  }, [form]);

  return (
    <div className="App">
        <Button type="primary" onClick={() => showModal(0)} style={btnStyle}>Add Account</Button>
        <Table rowSelection={rowSelection} columns={columns} dataSource={accounts} />

        <Modal title="Add Account" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Form form={form} name="dynamic_rule">
          <Form.Item
            {...formItemLayout}
            name="name"
            label="Account Name"
            rules={[
              {
                required: true,
                message: 'Please input account name',
              },
            ]}
          >
            <Input placeholder="Please input account name" />
          </Form.Item>
          <Form.Item {...formItemLayout} name="type" label="Account Type" rules={[{ required: true, message: 'Please select account type' }]}>
            <Select options={types} />
          </Form.Item>
          <Form.Item {...formItemLayout} name="category" label="Account Category" rules={[{ required: true, message: 'Please select account category' }]}>
            <Select options={category} />
          </Form.Item>
          <Form.Item {...formItemLayout} label="Use Status" name="status" valuePropName="status">
            <Switch />
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            name="note"
            label="Note"
            rules={[
              {
                required: true,
                message: 'Please input note',
              },
            ]}
          >
            <Input placeholder="Please input note" />
          </Form.Item>
        </Form>
        
      </Modal>
    </div>
  );
}

export default App;

