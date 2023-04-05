import React, { useEffect, useMemo, useState, ComponentType } from 'react';
import type { ValidationMap, Validator } from 'prop-types';
import { loadComponent, Props as RemoteComponentProps } from '../remote-component';
import { PropEditor } from './prop-editor';

type Props<T> = RemoteComponentProps<T> & {
  onChange: (value: T) => void;
};

export function ElementEditor<T>(props: Props<T>): JSX.Element {
  const { onChange, componentName, componentProps } = props;
  const [Component, setComponent] = useState<null | ComponentType<any>>(null);

  useEffect(() => {
    loadComponent(props).then((component) => {
      setComponent(() => component);
    });
  }, [loadComponent]);

  const propTypes = useMemo((): ValidationMap<T> => {
    return Component?.propTypes ?? {};
  }, [Component]);

  const getChangeHandler = <K extends keyof T>(propName: K) => (value: T[K]) => {
    onChange({ ...props.componentProps, [propName]: value })
  };

  return (
    <fieldset style={{ marginBottom: 32, maxWidth: 500 }}>
      <legend>{componentName}</legend>
      {Object.entries(propTypes).map(([propName, validator]) => (
        <PropEditor
          key={propName}
          propName={propName}
          validator={validator as Validator<string>}
          // @ts-ignore
          value={componentProps[propName]}
          // @ts-ignore
          onChange={getChangeHandler(propName)}
        />
      ))}
    </fieldset>
  );
}
