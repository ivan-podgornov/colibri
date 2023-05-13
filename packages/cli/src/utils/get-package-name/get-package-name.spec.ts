import { getPackageName } from './get-package-name';

describe('getPackageName', () => {
  it('should remove "@" and replace "/" with "_" in package name', () => {
    expect.assertions(1);
    const result = getPackageName('@my-org/my-package');
    expect(result).toBe('my-org_my-package');
  });

  it('should return the original package name if it does not contain "@" or "/"', () => {
    expect.assertions(1);
    const result = getPackageName('my-package');
    expect(result).toBe('my-package');
  });

  it('should remove multiple "@" symbols and replace multiple "/" symbols with "_"', () => {
    expect.assertions(1);
    const result = getPackageName('@my-org/my-package/sub-package');
    expect(result).toBe('my-org_my-package_sub-package');
  });

  it('should handle an empty package name', () => {
    expect.assertions(1);
    const result = getPackageName('');
    expect(result).toBe('');
  });
});
