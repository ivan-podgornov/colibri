import { exportsToExposes } from './exports-to-exposes';

describe('exportsToExposes', () => {
  it('returns an empty object if there are no exports', () => {
    expect.assertions(1);
    const result = exportsToExposes();
    expect(result).toStrictEqual({});
  });

  it('returns the same object if there are exports', () => {
    expect.assertions(1);
    const exports = {
      './foo': './src/foo.js',
      './bar': './src/bar.js',
    };
    const result = exportsToExposes(exports);
    expect(result).toStrictEqual(exports);
  });
});
