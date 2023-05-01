import type { ComponentType } from 'react';
import { LoadingError, LoadingErrorCode } from './loading-error';
import type {
  LoadingOptions,
  ModuleFederationContainer,
} from './load-component.types';

// Webpack adds this variable after executing __webpack_init_sharing__
declare const __webpack_share_scopes__: Record<string, string>;

/** Loads remote component and returns that one */
export async function loadComponent(
  options: LoadingOptions
): Promise<ComponentType> {
  const { componentData } = options;

  await loadPackage(options);
  await __webpack_init_sharing__('default');

  const container = getContainer(options);
  await container.init(__webpack_share_scopes__.default);

  const factory = await container.get(options.componentData.componentName);
  const remotePackage = factory();

  if (!(componentData.componentName in remotePackage)) {
    throw new LoadingError(LoadingErrorCode.PackageDoesntExists, options);
  }

  return factory()[componentData.componentName] as ComponentType;
}

/** Loads remote package */
function loadPackage(options: LoadingOptions) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = options.componentData.src;
    script.onload = resolve;
    script.onerror = () =>
      reject(new LoadingError(LoadingErrorCode.PackageUnavailable, options));

    document.head.appendChild(script);
  });
}

function getContainer(options: LoadingOptions): ModuleFederationContainer {
  const { packageName } = options.componentData;

  // colibri federation module provides package in window
  // check is there a package with specified name
  if (!(packageName in window)) {
    throw new LoadingError(LoadingErrorCode.PackageDoesntExists, options);
  }

  // @ts-expect-error - window has property with name packageName. Check it above
  return window[packageName];
}
