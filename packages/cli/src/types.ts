export interface ColibriOptions {
  /**
   * build - just build sources to output
   * development - build source and watch for changes
   */
  mode: 'development' | 'build';

  /**
   * Path to package with colibri components
   */
  root: string;
}

export interface PackageJson {
  name: string;
  main?: string;
  exports?: Record<string, string>;
}
