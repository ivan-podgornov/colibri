export interface PrePm2Options {
  /** The ref of the branch that is being published */
  branchRef: string;
  /** The domain name through which the server is accessible */
  domain: string;
  /** Ip address of the remote server */
  host: string;
  /** Repository address */
  repository: string;
  /** Working path on the remote server */
  workingPath: string;
  /** User's name on the remote server */
  user: string;
}

export interface DeploymentConfig {
  user: string;
  host: string;
  path: string;
  ref: string;
  repo: string;
}
