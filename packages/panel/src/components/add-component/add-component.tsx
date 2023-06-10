import React, { useState } from 'react';
import { Button, Form, Input, Space } from 'antd';

import {
  loadComponent,
  LoadingError,
  LoadingErrorCode,
  RemoteComponentData,
} from '../../utils/load-component';

interface Props {
  onAdd: (componentData: RemoteComponentData) => void;
  onCancel: () => void;
}

export function AddComponent(props: Props) {
  const { onAdd, onCancel } = props;
  const [loadingError, setLoadingError] = useState<LoadingError | null>(null);
  const [form] = Form.useForm<RemoteComponentData>();

  const validateMessages = {
    required: '"${label}" is required',
  };

  const getLoadingErrorData = (key: keyof RemoteComponentData) => {
    if (!loadingError) return {};

    const keysCodes: Record<keyof RemoteComponentData, LoadingErrorCode[]> = {
      componentName: [LoadingErrorCode.PackageDoesntExists],
      developmentSrc: [],
      stageSrc: [],
      src: [LoadingErrorCode.ComponentDoesntExists],
      packageName: [LoadingErrorCode.PackageUnavailable],
    };

    const codes = keysCodes[key];

    return codes.includes(loadingError.code)
      ? { validateStatus: 'error' as const, help: loadingError.message }
      : {};
  };

  const onFinish = async () => {
    try {
      const componentData = await form.validateFields();
      await loadComponent({ componentData });
      onAdd(componentData);
    } catch (error) {
      if (error instanceof LoadingError) {
        setLoadingError(error);
        return;
      }
      throw error;
    }
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
        {...getLoadingErrorData('packageName')}
        tooltip="Package's name where component is placed"
        label="Package Name"
        name="packageName"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        {...getLoadingErrorData('componentName')}
        tooltip="Package should export component with this name"
        label="Component Name"
        name="componentName"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        {...getLoadingErrorData('src')}
        tooltip="URL where the package is located"
        label="Source"
        name="src"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        {...getLoadingErrorData('developmentSrc')}
        tooltip="URL where the package is located in development mode"
        label="Development source"
        name="developmentSrc"
      >
        <Input />
      </Form.Item>
      <Form.Item
        {...getLoadingErrorData('stageSrc')}
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
