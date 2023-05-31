import { getHosts } from './get-hosts';

describe('getHosts', () => {
  it('for main branch returns default hosts', () => {
    expect.hasAssertions();

    expect(getHosts('origin/main', 'my-domain.com')).toStrictEqual({
      components: 'components.my-domain.com',
      api: 'api.my-domain.com',
      panel: 'my-domain.com',
    });
  });

  it('for other branches returns hosts with branchName as prefix', () => {
    expect.hasAssertions();

    expect(getHosts('origin/issue-n', 'my-domain.com')).toStrictEqual({
      components: 'components-issue-n.my-domain.com',
      api: 'api-issue-n.my-domain.com',
      panel: 'issue-n.my-domain.com',
    });
  });
});
