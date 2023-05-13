import { access, readFile } from 'node:fs/promises';
import path from 'path';

import type { PackageJson } from '../../types';
import { getPackageJson } from './get-package-json';

jest.mock<typeof import('node:fs/promises')>('node:fs/promises', () => {
  const original = jest.requireActual('node:fs/promises');

  return {
    ...original,
    access: jest.fn().mockResolvedValue(true),
    readFile: jest.fn(),
  };
});

describe('getPackageJson', () => {
  const root = '/path/to/root';

  // here it's normal. We mock fs in each test, so need to clear this mocks
  // eslint-disable-next-line jest/no-hooks
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should read and parse package.json file', async () => {
    expect.assertions(2);

    const expectedPackageJson: PackageJson = { main: './src/index.ts' };
    const json = JSON.stringify(expectedPackageJson);
    (readFile as jest.Mock).mockResolvedValueOnce(json);

    const packageJson = await getPackageJson(root);

    expect(readFile).toHaveBeenCalledWith(path.join(root, 'package.json'), 'utf8');
    expect(packageJson).toStrictEqual(expectedPackageJson);
  });

  it("should throw an error if package.json doesn't exists", async () => {
    expect.assertions(1);

    const error = new Error();
    // @ts-expect-error fs access throws errors with code property
    error.code = 'ENOENT';
    (access as jest.Mock).mockRejectedValueOnce(error);

    await expect(getPackageJson(root)).rejects.toThrow(
      `I can't find your package.json by this path: ${root}/package.json`
    );
  });

  it("should throw an error if cli doesn't have access to package.json", async () => {
    expect.assertions(1);

    const error = new Error();
    (access as jest.Mock).mockRejectedValueOnce(error);

    await expect(getPackageJson(root)).rejects.toThrow(
      `I haven't access to your package.json file: ${root}/package.json`
    );
  });

  it('should throw an error if package.json is invalid', async () => {
    expect.assertions(1);

    const json = '{"invalid_json":}';
    (readFile as jest.Mock).mockResolvedValueOnce(json);

    await expect(getPackageJson(root)).rejects.toThrow(
      'Your package.json file is wrong. Please, check syntax'
    );
  });

  it('should throw an error if package.json has an invalid main field', async () => {
    expect.assertions(1);

    const json = JSON.stringify({ main: 123 });
    (readFile as jest.Mock).mockResolvedValueOnce(json);

    await expect(getPackageJson(root)).rejects.toThrow(
      `main in package.json must be a string or undefined`
    );
  });

  it('should throw an error if package.json has an invalid exports field', async () => {
    expect.assertions(1);

    const json = JSON.stringify({ main: './src/index.ts', exports: '' });
    (readFile as jest.Mock).mockResolvedValueOnce(json);

    await expect(getPackageJson(root)).rejects.toThrow(
      `Your package.json has wrong exports. It must be a record string to string`
    );
  });
});
