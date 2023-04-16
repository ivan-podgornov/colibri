import type { LoadingOptions } from './load-component.types';

export enum LoadingErrorCode {
  PackageUnavailable = 'PackageUnavailable',
  PackageDoesntExists = 'PackageDoesntExists',
  ComponentDoesntExists = 'ComponentDoesntExists',
}

export class LoadingError extends Error {
  readonly code: LoadingErrorCode;

  constructor(code: LoadingErrorCode, options: LoadingOptions) {
    super(LoadingError.getMessage(code, options));
    this.code = code;
  }

  static getMessage(code: LoadingErrorCode, options: LoadingOptions): string {
    const { componentName, packageName, src } = options.componentData;

    switch (code) {
      case LoadingErrorCode.PackageUnavailable:
        return `Script from "${src}" doesn't exists or has wrong content`;
      case LoadingErrorCode.PackageDoesntExists:
        return `Script from "${src}" doesn't provide package with name "${packageName}"`;
      case LoadingErrorCode.ComponentDoesntExists:
        return `Package "${packageName}" doesn't export component with name "${componentName}"`;
    }
  }
}
