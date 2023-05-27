export interface PostSetupOptions {
  /** The ref of the branch that is being published */
  branchRef: string;
  /** The domain name through which the server is accessible */
  domain: string;
}

export interface PortsMap {
  components: number;
  panel: number;
  api: number;
}

export type HostsMap = Record<keyof PortsMap, string>;
