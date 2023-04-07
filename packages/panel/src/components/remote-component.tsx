import React, { useEffect, useState, FC } from 'react';
import PropTypes from 'prop-types';

export interface Props<T> {
  /** Название удалённого компонента. В модуле должен быть именованный экспорт с таким именем */
  componentName: string;

  /** Пропсы для этого удалённого компонента */
  componentProps: T;

  /** Название удалённого модуля */
  moduleName: string;

  /** Ссылка по которой можно получить удалённый модуль */
  src: string;
}

export async function loadComponent<T>(props: Props<T>) {
  const { src, componentName, moduleName } = props;

  await new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = resolve;
    script.onerror = reject;

    document.head.appendChild(script);
  });

  await __webpack_init_sharing__('default');

  // fix this later
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const container = window[moduleName];

  // fix this later
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  await container.init(__webpack_share_scopes__.default);

  // fix this later
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const factory = await window[moduleName].get(componentName);

  return factory()[componentName];
}

export function RemoteComponent<T>(props: Props<T>): JSX.Element {
  const { componentProps } = props;
  const [Component, setComponent] = useState<null | FC<any>>(null);

  useEffect(() => {
    loadComponent(props).then((component) => {
      setComponent(() => component);
    });
  }, [loadComponent]);

  return Component === null ? <></> : <Component {...componentProps} />
}

RemoteComponent.propTypes = {
  componentName: PropTypes.string.isRequired,
  componentProps: PropTypes.object.isRequired,
  moduleName: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
}
