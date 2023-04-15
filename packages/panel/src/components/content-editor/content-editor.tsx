import React, { useState } from 'react';
import { ComponentsLibrary } from '../components-library';
import { ElementEditor } from '../element-editor';
import styles from './content-editor.module.css';

interface Props {
  content: any[];
  onChange: (content: any[]) => void;
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
      <ComponentsLibrary
        open={isSelecting}
        onClose={() => setIsSelecting(false)}
      />
      <button type="button" onClick={() => setIsSelecting(true)}>
        Add component
      </button>
    </div>
  );
}
