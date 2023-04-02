import React, {
  useCallback,
  useEffect,
  useState,
  FC,
} from 'react';

interface Props<T> {
  /** Название удалённого компонента */
  componentName: string;

  /** Пропсы для этого удалённого компонента */
  componentProps: T;

  /** Ссылка по которой можно получить удалённый компонент */
  src: string;
}

export function RemoteComponent<T>(props: Props<T>) {
  const { componentName, componentProps, src } = props;
  const [Component, setComponent] = useState<null | FC<any>>(null);

  const loadComponent = useCallback(async () => {
    await new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = resolve;
      script.onerror = reject;

      document.head.appendChild(script);
    });

    await __webpack_init_sharing__('default');

    // @ts-ignore
    const container = window[componentName];

    // @ts-ignore
    await container.init(__webpack_share_scopes__.default);

    // @ts-ignore
    const factory = await window[componentName].get('./component');

    return factory().default;
  }, [src]);

  useEffect(() => {
    loadComponent().then((component) => {
      setComponent(() => component);
    });
  }, [loadComponent]);

  return (Component !== null) && <Component {...componentProps} />
}

export default RemoteComponent;
