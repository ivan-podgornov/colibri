import { parsePackageJson } from './parse-package-json';

describe('parsePackageJson', () => {
  it('should throw an error when JSON is invalid', () => {
    expect.assertions(1);
    const invalidJson = '{ "name": "my-package, }';
    expect(() => parsePackageJson(invalidJson)).toThrow(
      'Your package.json file is wrong. Please, check syntax'
    );
  });

  it('should throw an error when package.json is not an object', () => {
    expect.assertions(1);
    const invalidJson = '[]';
    expect(() => parsePackageJson(invalidJson)).toThrow('package.json must be an object');
  });

  it('should throw an error when "name" property is not a string', () => {
    expect.assertions(1);
    const invalidJson = '{}';
    expect(() => parsePackageJson(invalidJson)).toThrow('name in package.json must be a string');
  });

  it('should throw an error when "main" property is not a string or undefined', () => {
    expect.assertions(1);
    const invalidJson = '{ "main": [], "name": "my-package" }';
    expect(() => parsePackageJson(invalidJson)).toThrow(
      'main in package.json must be a string or undefined'
    );
  });

  it('should throw an error when "exports" property is not a record string to string', () => {
    expect.assertions(1);
    const invalidJson = '{ "exports": { "foo": 42 }, "name": "my-package" }';
    expect(() => parsePackageJson(invalidJson)).toThrow(
      'Your package.json has wrong exports. It must be a record string to string'
    );
  });

  it('should return parsed package.json', () => {
    expect.assertions(1);
    const validJson =
      '{ "main": "index.js", "exports": { "./foo": "./src/foo.js" }, "name": "my-package" }';
    expect(parsePackageJson(validJson)).toStrictEqual({
      name: 'my-package',
      main: 'index.js',
      exports: { './foo': './src/foo.js' },
    });
  });
});
