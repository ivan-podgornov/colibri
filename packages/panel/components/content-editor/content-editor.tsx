import React from 'react';
import { ElementEditor } from '../element-editor';
import styles from './content-editor.module.css';

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

  const getRemoveHandler = (index: number) => () => {
    const copy = [...content];
    copy.splice(index, 1);
    onChange(copy);
  };

  return (
    <ul className={styles.content}>
      {content.map((element, i) => (
        <li key={i} className={styles.element}>
          <ElementEditor
            {...element}
            onChange={getChangeHandler(i)}
            onRemove={getRemoveHandler(i)}
          />
        </li>
      ))}
    </ul>
  );
}
