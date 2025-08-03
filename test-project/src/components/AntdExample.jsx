import React, { useState } from 'react';
import { Button, Card, Table, Form, Input, Select, DatePicker, Space, message, Modal } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const { Option } = Select;

const AntdExample = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState([
    {
      key: '1',
      name: '김철수',
      age: 32,
      address: '서울시 강남구',
      email: 'kim@example.com',
    },
    {
      key: '2',
      name: '이영희',
      age: 28,
      address: '부산시 해운대구',
      email: 'lee@example.com',
    },
  ]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingKey, setEditingKey] = useState('');

  const columns = [
    {
      title: '이름',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '나이',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '주소',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '이메일',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '작업',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            수정
          </Button>
          <Button
            type="primary"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.key)}
          >
            삭제
          </Button>
        </Space>
      ),
    },
  ];

  const handleAdd = () => {
    setIsModalVisible(true);
    setEditingKey('');
    form.resetFields();
  };

  const handleEdit = (record) => {
    setIsModalVisible(true);
    setEditingKey(record.key);
    form.setFieldsValue(record);
  };

  const handleDelete = (key) => {
    Modal.confirm({
      title: '삭제 확인',
      content: '정말로 이 항목을 삭제하시겠습니까?',
      onOk() {
        setData(data.filter(item => item.key !== key));
        message.success('삭제되었습니다.');
      },
    });
  };

  const handleModalOk = () => {
    form.validateFields().then((values) => {
      if (editingKey) {
        // 수정
        setData(data.map(item => 
          item.key === editingKey ? { ...item, ...values } : item
        ));
        message.success('수정되었습니다.');
      } else {
        // 추가
        const newItem = {
          key: Date.now().toString(),
          ...values,
        };
        setData([...data, newItem]);
        message.success('추가되었습니다.');
      }
      setIsModalVisible(false);
      form.resetFields();
    });
  };

  return (
    <div className="p-6">
      <Card title="Ant Design 예제" className="mb-6">
        <p className="mb-4">
          Ant Design 컴포넌트들을 사용한 예제입니다. 테이블, 폼, 모달 등을 포함합니다.
        </p>
        
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleAdd}
          className="mb-4"
        >
          새 항목 추가
        </Button>

        <Table
          columns={columns}
          dataSource={data}
          pagination={{ pageSize: 10 }}
          rowKey="key"
        />
      </Card>

      <Modal
        title={editingKey ? "항목 수정" : "새 항목 추가"}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          className="mt-4"
        >
          <Form.Item
            name="name"
            label="이름"
            rules={[{ required: true, message: '이름을 입력해주세요!' }]}
          >
            <Input placeholder="이름을 입력하세요" />
          </Form.Item>

          <Form.Item
            name="age"
            label="나이"
            rules={[{ required: true, message: '나이를 입력해주세요!' }]}
          >
            <Input type="number" placeholder="나이를 입력하세요" />
          </Form.Item>

          <Form.Item
            name="address"
            label="주소"
            rules={[{ required: true, message: '주소를 입력해주세요!' }]}
          >
            <Input placeholder="주소를 입력하세요" />
          </Form.Item>

          <Form.Item
            name="email"
            label="이메일"
            rules={[
              { required: true, message: '이메일을 입력해주세요!' },
              { type: 'email', message: '올바른 이메일 형식이 아닙니다!' }
            ]}
          >
            <Input placeholder="이메일을 입력하세요" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AntdExample; 