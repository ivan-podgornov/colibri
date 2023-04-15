import React, { useState } from 'react';
import { Button, Modal, Space, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { AddComponent } from '../add-component';
import type { RemoteComponentData } from '../remote-component';

interface Props {
  open: boolean;
  onClose: () => void;
}

export function ComponentsLibrary(props: Props) {
  const { open, onClose } = props;

  const [isAdding, setIsAdding] = useState(false);
  const [components, setComponents] = useState<RemoteComponentData[]>([]);

  const columns: ColumnsType<RemoteComponentData> = [
    {
      dataIndex: 'packageName',
      key: 'packageName',
      title: 'Package Name',
    },
    {
      dataIndex: 'componentName',
      key: 'componentName',
      title: 'Component Name',
    },
    {
      dataIndex: 'src',
      key: 'src',
      title: 'Source',
    },
    {
      dataIndex: 'developmentSrc',
      key: 'developmentSrc',
      title: 'Development Source',
    },
    {
      dataIndex: 'stageSrc',
      key: 'stageSrc',
      title: 'Stage Source',
    },
  ];

  const addComponentHandler = (newComponent: RemoteComponentData) => {
    setComponents([...components, newComponent]);
    setIsAdding(false);
  };

  const selectComponentsHandler = (
    keys: React.Key[],
    rows: RemoteComponentData[]
  ) => {
    console.log(keys, rows);
  };

  return (
    <Modal
      footer={null}
      title={isAdding ? 'Add a new component' : 'Components Library'}
      open={open}
      onCancel={onClose}
      width={isAdding ? undefined : 800}
    >
      {isAdding ? (
        <AddComponent
          onAdd={addComponentHandler}
          onCancel={() => setIsAdding(false)}
        />
      ) : (
        <Space direction="vertical" size="large" style={{ display: 'flex' }}>
          <Table
            columns={columns}
            dataSource={components}
            pagination={false}
            size="small"
            rowSelection={{
              type: 'checkbox',
              onChange: selectComponentsHandler,
            }}
          />
          <Space direction="horizontal">
            <Button type="primary" htmlType="button">
              Select
            </Button>
            <Button
              type="default"
              htmlType="button"
              onClick={() => setIsAdding(true)}
            >
              Add a new component
            </Button>
          </Space>
        </Space>
      )}
    </Modal>
  );
}
