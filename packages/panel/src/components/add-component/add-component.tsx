import React from 'react';
import { Button, Form, Input, Space } from 'antd';
import { RemoteComponentData } from '../remote-component';

interface Props {
  onAdd: (componentData: RemoteComponentData) => void;
  onCancel: () => void;
}

export function AddComponent(props: Props) {
  const { onAdd, onCancel } = props;
  const [form] = Form.useForm<RemoteComponentData>();

  const validateMessages = {
    required: '"${label}" is required',
  };

  const onFinish = async () => {
    const componentData = await form.validateFields();
    onAdd(componentData);
  };

  return (
    <Form
      form={form}
      layout="horizontal"
      labelCol={{ span: 10 }}
      labelWrap
      wrapperCol={{ span: 24 }}
      name="component.add"
      validateMessages={validateMessages}
      onFinish={onFinish}
    >
      <Form.Item
        tooltip="Package's name where component is placed"
        label="Package Name"
        name="packageName"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        tooltip="Package should export component with this name"
        label="Component Name"
        name="componentName"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        tooltip="URL where the package is located"
        label="Source"
        name="src"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        tooltip="URL where the package is located in development mode"
        label="Development source"
        name="developmentSrc"
      >
        <Input />
      </Form.Item>
      <Form.Item
        tooltip="URL where the package is located in staging mode"
        label="Stage source"
        name="stageSrc"
      >
        <Input />
      </Form.Item>
      <Form.Item wrapperCol={{ span: 14, offset: 10 }}>
        <Space>
          <Button type="primary" htmlType="submit">
            Add
          </Button>
          <Button type="default" htmlType="button" onClick={onCancel}>
            Cancel
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
}
