import React, { useEffect, useState, FC } from 'react';
import { loadComponent, RemoteComponentData } from '../../utils/load-component';

export interface Props<T> {
  /** Data about remote component */
  componentData: RemoteComponentData;

  /** Props for this remote component */
  componentProps: T;
}

export function RemoteComponent<T>(props: Props<T>): JSX.Element {
  const { componentData, componentProps } = props;
  const [Component, setComponent] = useState<null | FC<any>>(null);

  useEffect(() => {
    loadComponent({ componentData }).then((component) => {
      setComponent(() => component as FC);
    });
  }, [loadComponent]);

  return Component === null ? <></> : <Component {...componentProps} />;
}
