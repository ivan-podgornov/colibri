import React, { useMemo, ComponentType } from 'react';
import type { ValidationMap, Validator } from 'prop-types';
import { PropEditor } from '../props-editor/prop-editor';

type Props<T> = {
  Component: ComponentType<T>;
  componentProps: T;
  omit?: Array<keyof T>;
  onChange: (componentProps: T) => void;
};

export function PropsEditor<T>(props: Props<T>): JSX.Element {
  const { Component, componentProps, omit = [], onChange } = props;

  const propTypes = useMemo((): ValidationMap<T> => {
    const propTypes = (Component.propTypes || {}) as ValidationMap<T>;
    const filteredEntries = (
      Object.entries(propTypes) as [keyof T, unknown][]
    ).filter(([key]) => !omit.includes(key));
    return Object.fromEntries(filteredEntries) as ValidationMap<T>;
  }, [Component]);

  const getChangeHandler =
    <K extends keyof T>(propName: K) =>
    (value: T[K]) => {
      onChange({ ...props.componentProps, [propName]: value });
    };

  return (
    <div>
      {Object.entries(propTypes).map(([propName, validator]) => (
        <PropEditor
          key={propName}
          propName={propName}
          validator={validator as Validator<string>}
          // Fix this later
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          value={componentProps[propName]}
          // Fix this later
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          onChange={getChangeHandler(propName)}
        />
      ))}
    </div>
  );
}
