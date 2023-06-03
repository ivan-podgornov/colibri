export interface PortsMap {
  components: number;
  panel: number;
  api: number;
}

export type HostsMap = Record<keyof PortsMap, string>;
