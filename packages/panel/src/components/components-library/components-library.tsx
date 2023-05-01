import React, { useState } from 'react';
import { Button, Modal, Space, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

import type { RemoteComponentData } from '../../utils/load-component';
import { AddComponent } from '../add-component';

interface Props {
  open: boolean;
  onClose: () => void;
  onSelectComponents: (components: RemoteComponentData[]) => void;
}

export function ComponentsLibrary(props: Props) {
  const { open, onClose, onSelectComponents } = props;

  const [isAdding, setIsAdding] = useState(false);
  const [components, setComponents] = useState<RemoteComponentData[]>([]);
  const [selectedComponents, setSelectedComponents] = useState<
    RemoteComponentData[]
  >([]);

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

  const changeSelectedRowsHandler = (
    _unused: unknown,
    selected: RemoteComponentData[]
  ) => {
    setSelectedComponents(selected);
  };

  const withIndexesAsKeys = (components: RemoteComponentData[]) => {
    return components.map((component, index) => ({
      ...component,
      key: index,
    }));
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
            dataSource={withIndexesAsKeys(components)}
            pagination={false}
            size="small"
            rowSelection={{
              type: 'checkbox',
              onChange: changeSelectedRowsHandler,
            }}
          />
          <Space direction="horizontal">
            <Button
              disabled={selectedComponents.length === 0}
              type="primary"
              htmlType="button"
              onClick={() => onSelectComponents(selectedComponents)}
            >
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
