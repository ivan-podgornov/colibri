import type { PackageJson } from '../../types';

export function parsePackageJson(json: string): PackageJson {
  if (!isValidJson(json)) {
    throw new Error('Your package.json file is wrong. Please, check syntax');
  }

  const packageJson = JSON.parse(json);
  checkPackageJson(packageJson);

  return JSON.parse(json);
}

function isValidJson(json: string): boolean {
  try {
    JSON.parse(json);
    return true;
  } catch {
    return false;
  }
}

function checkPackageJson(maybePackageJson: unknown): maybePackageJson is PackageJson {
  if (
    !maybePackageJson ||
    typeof maybePackageJson !== 'object' ||
    Array.isArray(maybePackageJson)
  ) {
    throw new TypeError('package.json must be an object');
  }

  const { name, main, exports } = maybePackageJson as PackageJson;

  if (typeof name !== 'string') {
    throw new TypeError('name in package.json must be a string');
  }

  if (!['undefined', 'string'].includes(typeof main)) {
    throw new TypeError('main in package.json must be a string or undefined');
  }

  if (exports !== undefined && !isExportsObject(exports)) {
    return false;
  }

  return true;
}

function isExportsObject(maybeExports: unknown): maybeExports is Record<string, string> {
  if (!maybeExports || typeof maybeExports !== 'object') {
    throw new TypeError(
      'Your package.json has wrong exports. It must be a record string to string'
    );
  }

  const everyIsString = Object.keys(maybeExports).every(
    (key) => typeof (maybeExports as Record<string, unknown>)[key] === 'string'
  );

  if (!everyIsString) {
    throw new TypeError(
      'Your package.json has wrong exports. It must be a record string to string'
    );
  }

  return true;
}
