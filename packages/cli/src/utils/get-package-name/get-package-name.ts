/**
 * Returns package name
 * @description transform package.json name to module federation name. Not all characters that
 * allowed in package.json name are allowing in mf name. This util transforms these characters.
 */
export function getPackageName(name: string): string {
  const nameWithoutAt = name.replace(/@/g, '');
  return nameWithoutAt.replace(/\//g, '_');
}
