import { findFreePorts } from 'find-free-ports';
import { getPorts, DEFAULT_PORTS } from './get-ports';
import type { PostSetupOptions } from './post-setup.types';

jest.mock<typeof import('find-free-ports')>('find-free-ports', () => {
  const actual = jest.requireActual('find-free-ports');

  return {
    ...actual,
    findFreePorts: jest.fn(),
  };
});

const defaultOptions: PostSetupOptions = {
  branchRef: 'origin/issue-n',
  domain: 'my-domain.com',
  databaseUrl: 'postgresql://dbuser:dbpassword@127.0.0.1:5432/issue-n',
};

describe('getPorts', () => {
  it('for main branch returns default ports', async () => {
    expect.hasAssertions();
    const options: PostSetupOptions = { ...defaultOptions, branchRef: 'origin/main' };

    await expect(getPorts(options)).resolves.toStrictEqual(DEFAULT_PORTS);
  });

  it('for other branches returns ports that returns findFreePorts', async () => {
    expect.hasAssertions();

    const findFreePortsMock = findFreePorts as unknown as jest.Mock;
    findFreePortsMock.mockResolvedValueOnce([3005, 3006, 3007]);
    const options: PostSetupOptions = { ...defaultOptions, branchRef: 'origin/issue-n' };

    await expect(getPorts(options)).resolves.toStrictEqual({
      components: 3005,
      panel: 3006,
      api: 3007,
    });
  });

  it('for other branches calls findFreePorts with params startPort = 3005 and endPort = 4000', async () => {
    expect.hasAssertions();

    const findFreePortsMock = findFreePorts as unknown as jest.Mock;
    findFreePortsMock.mockResolvedValueOnce([3005, 3006, 3007]);
    const options: PostSetupOptions = { ...defaultOptions, branchRef: 'origin/issue-n' };
    await getPorts(options);

    expect(findFreePortsMock).toHaveBeenCalledWith(3, { startPort: 3005, endPort: 4000 });
  });
});
