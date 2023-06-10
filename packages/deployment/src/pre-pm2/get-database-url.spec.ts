import { getDatabaseUrl } from './get-database-url';
import type { PrePm2Options } from './pre-pm2.types';

const defaultOptions: PrePm2Options = {
  branchRef: 'origin/issue-n',
  domain: 'my-domain.com',
  host: '192.168.0.1',
  repository: 'https://github.com/ivan-podgornov/colibri.git',
  workingPath: '/home/pm2/colibri/',
  user: 'user',
  databaseUser: 'user',
  databasePassword: 'password',
  databaseHost: '127.0.0.1',
  databasePort: 5432,
};

describe('getDatabaseUrl', () => {
  it('returns url for connect to database', () => {
    expect.hasAssertions();
    const options: PrePm2Options = {
      ...defaultOptions,
      branchRef: 'origin/issue-n',
      databaseUser: 'crazy-user',
      databasePassword: 'secret',
      databaseHost: '192.168.17.15',
      databasePort: 7845,
    };

    expect(getDatabaseUrl(options)).toBe(
      'postgresql://crazy-user:secret@192.168.17.15:7845/issue-n'
    );
  });
});
