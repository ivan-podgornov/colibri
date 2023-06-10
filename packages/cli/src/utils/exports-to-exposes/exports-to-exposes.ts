type PathLike = string;
type Exposes = Record<string, PathLike>;

/** Transforms package.json exports to module federation exposes */
export function exportsToExposes(packageExports?: Record<string, PathLike>): Exposes {
  return packageExports ?? {};
}
