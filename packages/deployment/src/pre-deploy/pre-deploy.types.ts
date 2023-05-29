export interface PortsMap {
  components: number;
  panel: number;
  api: number;
}

export interface PreDeployOptions {
  /** The ref of the branch that is being published */
  branchRef: string;
  /** The domain name through which the server is accessible */
  domain: string;
  /**
   * URL that can be used for connect to database
   * @example postgresql://user:password@127.0.0.1:5432/colibri
   */
  databaseUrl: string;
}

export type HostsMap = Record<keyof PortsMap, string>;
