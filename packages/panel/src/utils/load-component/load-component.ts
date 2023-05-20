import { ComponentType } from 'react';
import { injectScript } from '@module-federation/utilities';
import { LoadingError, LoadingErrorCode } from './loading-error';
import type { LoadingOptions, ModuleFederationContainer } from './load-component.types';

// Webpack adds this variable after executing __webpack_init_sharing__
declare const __webpack_share_scopes__: Record<string, string>;

/** Loads remote component and returns that one */
export async function loadComponent(options: LoadingOptions): Promise<ComponentType> {
  const { componentData } = options;
  const path = typeof window === 'undefined' ? '/server/remoteEntry.js' : '/client/remoteEntry.js';
  const url = new URL(path, componentData.src).toString();

  __webpack_init_sharing__('default');

  const container =
    typeof window === 'undefined'
      ? await new Promise<ModuleFederationContainer>((resolve) =>
          // @ts-expect-error @module-federation/utilities breaks types here
          __webpack_require__.l(url, resolve, 'colibri_components')
        )
      : await injectScript({ url, global: 'colibri_components' });

  // @ts-expect-error everything ok here
  await container.init(__webpack_share_scopes__.default);

  const factory = await container.get(options.componentData.componentName);
  const remotePackage = factory();

  if (!(componentData.componentName in remotePackage)) {
    throw new LoadingError(LoadingErrorCode.PackageDoesntExists, options);
  }

  return factory()[componentData.componentName] as ComponentType;
}

const cache = new Map<string, ComponentType>();

export async function getLazyComponent(
  options: LoadingOptions
): Promise<{ default: ComponentType }> {
  const hash = Object.values(options.componentData).join('|');
  const Component = cache.get(hash) || (await loadComponent(options));

  if (!cache.has(hash)) {
    cache.set(hash, Component);
  }

  return Promise.resolve({ default: Component });
}
