import React, { useEffect, useState, ComponentType } from 'react';
import {
  loadComponent,
  Props as RemoteComponentProps,
} from '../remote-component';
import { PropsEditor } from '../props-editor';
import styles from './element-editor.module.css';

type Props<T> = RemoteComponentProps<T> & {
  onChange: (value: T) => void;
  onRemove: () => void;
};

export function ElementEditor<T>(props: Props<T>): JSX.Element {
  const { onChange, onRemove, componentData, componentProps } = props;
  const [Component, setComponent] = useState<null | ComponentType<any>>(null);

  useEffect(() => {
    loadComponent(componentData).then((component) => {
      setComponent(() => component);
    });
  }, [loadComponent]);

  return (
    <fieldset className={styles.props}>
      <legend>{componentData.componentName}</legend>
      <button className={styles.remove} type="button" onClick={onRemove}>
        x
      </button>
      {Component !== null && (
        <PropsEditor
          Component={Component}
          componentProps={componentProps}
          onChange={onChange}
        />
      )}
    </fieldset>
  );
}
