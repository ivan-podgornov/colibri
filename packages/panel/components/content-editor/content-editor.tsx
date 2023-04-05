import React, { useState } from 'react';
import { AddComponent } from '../add-component';
import { ElementEditor } from '../element-editor';
import styles from './content-editor.module.css';

interface Props {
  content: any[];
  onChange: (content: any[]) => void;
}

export function ContentEditor(props: Props) {
  const { content, onChange } = props;

  const [isAdding, setIsAdding] = useState(true);

  const create = (props: any) => {
    onChange([...content, props]);
  };

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
    <div>
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
      <AddComponent
        open={isAdding}
        onClose={() => setIsAdding(false)}
        onCreated={create}
      />
      <button type="button" onClick={() => setIsAdding(true)}>
        Add component
      </button>
    </div>
  );
}
