import React from 'react';
import { ElementEditor } from '../components/element-editor';

interface Props {
  content: any[];
  onChange: (content: any[]) => void;
}

export function ContentEditor(props: Props) {
  const { content, onChange } = props;

  const getChangeHandler = (index: number) => (value: any) => {
    const copy = [...content];
    copy.splice(index, 1, { ...content[index], componentProps: value });
    onChange(copy);
  };

  return (
    <>
      {content.map((element, i) => <ElementEditor key={i} {...element} onChange={getChangeHandler(i)} />)}
    </>
  );
}
