import fs from 'node:fs/promises';
import path from 'node:path';

/** Creates directory if this directory doesn't exists */
export async function mkdirIfNotExists(path: string): Promise<void> {
  try {
    await fs.mkdir(path, { recursive: true });
  } catch (error) {
    if (error instanceof Error && 'code' in error && error.code === 'EEXISTS') {
      return;
    }

    throw error;
  }
}

/**
 * Returns branch name by branch ref
 * @example getBranchName(origin/issue-30); // issue-30
 */
export function getBranchName(branchRef: string): string {
  return path.basename(branchRef);
}

/**
 * Returns path on the remote server where branch will be deployment
 */
export function getPath(branchRef: string, workingPath: string): string {
  const branchName = getBranchName(branchRef);
  return path.join(workingPath, branchName);
}
