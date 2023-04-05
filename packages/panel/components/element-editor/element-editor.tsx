import React, { useEffect, useMemo, useState, ComponentType } from 'react';
import type { ValidationMap, Validator } from 'prop-types';
import { loadComponent, Props as RemoteComponentProps } from '../remote-component';
import { PropsEditor } from '../props-editor';
import styles from './element-editor.module.css';

type Props<T> = RemoteComponentProps<T> & {
  onChange: (value: T) => void;
  onRemove: () => void;
};

export function ElementEditor<T>(props: Props<T>): JSX.Element {
  const { onChange, onRemove, componentName, componentProps } = props;
  const [Component, setComponent] = useState<null | ComponentType<any>>(null);

  useEffect(() => {
    loadComponent(props).then((component) => {
      setComponent(() => component);
    });
  }, [loadComponent]);

  return (
    <fieldset className={styles.props}>
      <legend>{componentName}</legend>
      <button className={styles.remove} type="button" onClick={onRemove}>x</button>
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
