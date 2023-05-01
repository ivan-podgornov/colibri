import React, { useEffect, useMemo, useState, ComponentType } from 'react';
import type { ValidationMap, Validator } from 'prop-types';
import { Form } from 'antd';

import { loadComponent, RemoteComponentData } from '../../utils/load-component';
import { PropEditor } from './prop-editor';

type Props<T extends object> = {
  componentData: RemoteComponentData;
  componentProps: T;
  onChange: (componentProps: T) => void;
};

export function PropsEditor<T extends object>(props: Props<T>): JSX.Element {
  const { componentData, componentProps, onChange } = props;

  const [Component, setComponent] = useState<null | ComponentType<any>>(null);

  useEffect(() => {
    loadComponent({ componentData }).then((component) => {
      setComponent(() => component as ComponentType);
    });
  }, [loadComponent]);

  const propTypes = useMemo((): ValidationMap<T> => {
    return (Component?.propTypes || {}) as ValidationMap<T>;
  }, [Component]);

  const getChangeHandler =
    <K extends keyof T>(propName: K) =>
    (value: T[K]) => {
      onChange({ ...props.componentProps, [propName]: value });
    };

  return (
    <Form layout="vertical">
      {Object.entries(propTypes).map(([propName, validator]) => (
        <PropEditor
          key={propName}
          propName={propName}
          validator={validator as Validator<string>}
          // @ts-expect-error - fix this later
          value={componentProps[propName]}
          // @ts-expect-error - fix this later
          onChange={getChangeHandler(propName)}
        />
      ))}
    </Form>
  );
}
