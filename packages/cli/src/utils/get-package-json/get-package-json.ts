import { constants } from 'node:fs';
import { access, readFile } from 'node:fs/promises';
import { join } from 'node:path';

import type { PackageJson } from '../../types';
import { parsePackageJson } from '../parse-package-json/parse-package-json';

/**
 * Returns package.json file
 * @param root - current working directory
 */
export async function getPackageJson(root: string): Promise<PackageJson> {
  const filename = join(root, './package.json');
  await checkFile(filename);
  const rawPackageJson = await readFile(filename, 'utf8');

  return parsePackageJson(rawPackageJson);
}

/**
 * Checks is user's package.json exists
 * @param root - current working directory
 */
async function checkFile(packageJsonPath: string) {
  try {
    await access(packageJsonPath, constants.R_OK);
  } catch (error) {
    if (error instanceof Error && 'code' in error && error.code === 'ENOENT') {
      throw new Error(`I can't find your package.json by this path: ${packageJsonPath}`);
    }

    throw new Error(`I haven't access to your package.json file: ${packageJsonPath}`);
  }
}
