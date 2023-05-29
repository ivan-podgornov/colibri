import { getHosts } from './get-hosts';
import type { PostSetupOptions } from './post-setup.types';

const defaultOptions: PostSetupOptions = {
  branchRef: 'origin/issue-n',
  domain: 'my-domain.com',
  databaseUrl: 'postgresql://dbuser:dbpassword@127.0.0.1:5432/issue-n',
};

describe('getHosts', () => {
  it('for main branch returns default hosts', () => {
    expect.hasAssertions();
    const options: PostSetupOptions = { ...defaultOptions, branchRef: 'origin/main' };

    expect(getHosts(options)).toStrictEqual({
      components: 'components.my-domain.com',
      api: 'api.my-domain.com',
      panel: 'my-domain.com',
    });
  });

  it('for other branches returns hosts with branchName as prefix', () => {
    expect.hasAssertions();
    const options: PostSetupOptions = { ...defaultOptions, branchRef: 'origin/issue-n' };

    expect(getHosts(options)).toStrictEqual({
      components: 'components-issue-n.my-domain.com',
      api: 'api-issue-n.my-domain.com',
      panel: 'issue-n.my-domain.com',
    });
  });
});
