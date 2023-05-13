import { getMain } from './get-main';

describe('getMain', () => {
  it('returns path to user-specified main file', () => {
    expect.assertions(1);
    const cwd = '/path/to/project';
    const packageJson = { main: 'src/index.js' };
    expect(getMain(cwd, packageJson)).toBe('/path/to/project/src/index.js');
  });

  it('returns path to user-specified main file even when this is an empty string', () => {
    expect.assertions(1);
    const cwd = '/path/to/project';
    const packageJsonWithEmptyMain = { main: '' };
    expect(getMain(cwd, packageJsonWithEmptyMain)).toBe('/path/to/project');
  });

  it('returns path to default main file when package.json main is not specified', () => {
    expect.assertions(1);
    const cwd = '/path/to/project';
    const packageJsonWithoutMain = {};
    expect(getMain(cwd, packageJsonWithoutMain)).toBe('/path/to/project/index.js');
  });
});
