import React, { useEffect, useState, FC } from 'react';

export interface RemoteComponentData {
  /** Component's name */
  componentName: string;

  /** Package's name where component is placed */
  packageName: string;

  /** URL where the package is located */
  src: string;

  /** URL where the package is located in development mode */
  developmentSrc?: string;

  /** URL where the package is located in staging mode */
  stageSrc?: string;
}

export interface Props<T> {
  /** Data about remote component */
  componentData: RemoteComponentData;

  /** Props for this remote component */
  componentProps: T;
}

export async function loadComponent(componentData: RemoteComponentData) {
  await new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = componentData.src;
    script.onload = resolve;
    script.onerror = reject;

    document.head.appendChild(script);
  });

  await __webpack_init_sharing__('default');

  // @ts-expect-error - fix this later
  const container = window[componentData.moduleName];

  // @ts-expect-error - fix this later
  await container.init(__webpack_share_scopes__.default);

  // @ts-expect-error - fix this later
  const factory = await window[componentData.packageName].get(
    componentData.componentName
  );

  return factory()[componentData.componentName];
}

export function RemoteComponent<T>(props: Props<T>): JSX.Element {
  const { componentProps } = props;
  const [Component, setComponent] = useState<null | FC<any>>(null);

  useEffect(() => {
    loadComponent(props.componentData).then((component) => {
      setComponent(() => component);
    });
  }, [loadComponent]);

  return Component === null ? <></> : <Component {...componentProps} />;
}
