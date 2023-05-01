import React, { useState } from 'react';
import { Button, Collapse, Space, Tooltip } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

import { ComponentsLibrary } from '../components-library';
import { PropsEditor } from '../props-editor';
import type { RemoteComponentData } from '../../utils/load-component';
import { getDefaultPropsForRemoteComponent } from '../../utils/get-default-props';

export interface ContentElement<P extends object = object> {
  /** Data about component that will be used for content */
  componentData: RemoteComponentData;

  /** Props for this component */
  componentProps: P;
}

interface Props {
  content: ContentElement[];
  onChange: (content: ContentElement[]) => void;
}

export function ContentEditor(props: Props) {
  const { content, onChange } = props;

  /** True when user is selecting component */
  const [isSelecting, setIsSelecting] = useState(false);

  const getChangeHandler = (index: number) => (value: any) => {
    const copy = [...content];
    copy.splice(index, 1, { ...content[index], componentProps: value });
    onChange(copy);
  };

  const getRemoveHandler = (index: number) => () => {
    const copy = [...content];
    copy.splice(index, 1);
    onChange(copy);
  };

  const onSelectComponents = async (components: RemoteComponentData[]) => {
    setIsSelecting(false);

    const componentsProps = await Promise.all(
      components.map(getDefaultPropsForRemoteComponent)
    );

    const newContent: ContentElement[] = componentsProps.map((props, i) => ({
      componentData: components[i],
      componentProps: props,
    }));

    onChange([...content, ...newContent]);
  };

  return (
    <Space direction="vertical">
      <Collapse expandIconPosition="start">
        {content.map((element, i) => (
          <Collapse.Panel
            key={i}
            header={element.componentData.componentName}
            extra={
              <Tooltip title="Remove">
                <Button
                  htmlType="button"
                  icon={<DeleteOutlined />}
                  size="small"
                  shape="circle"
                  type="ghost"
                  onClick={getRemoveHandler(i)}
                />
              </Tooltip>
            }
          >
            <PropsEditor
              componentData={element.componentData}
              componentProps={element.componentProps}
              onChange={getChangeHandler(i)}
            />
          </Collapse.Panel>
        ))}
      </Collapse>
      <Button
        type="primary"
        htmlType="button"
        onClick={() => setIsSelecting(true)}
      >
        Add element
      </Button>
      <ComponentsLibrary
        open={isSelecting}
        onClose={() => setIsSelecting(false)}
        onSelectComponents={onSelectComponents}
      />
    </Space>
  );
}
