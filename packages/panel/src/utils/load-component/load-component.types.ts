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

export interface LoadingOptions {
  componentData: RemoteComponentData;
}

/**
 * This factory creates a module, which is essentially a record of entities that
 * can be accessed from a remote location. The keys of this collection
 * correspond to the names of the entities being exported, while the values
 * represent the exported entities themselves.
 */
type ModuleFactory = () => Record<string, unknown>;

/** @see https://webpack.js.org/concepts/module-federation/#dynamic-remote-containers */
export interface ModuleFederationContainer {
  init: (scope: string) => Promise<void>;

  /** Returns a factory that creates a remote module */
  get: (packageName: string) => Promise<ModuleFactory>;
}
