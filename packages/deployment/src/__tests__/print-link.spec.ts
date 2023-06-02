/* eslint jest/no-hooks: ["error", { "allow": ["beforeAll"] }] */

import { execSync } from 'node:child_process';

describe('print-link', () => {
  it('for branches different to main, prints link in format "branchName.my-domain.com"', () => {
    expect.hasAssertions();

    const command =
      'yarn -s deployment print-link --branch-ref origin/issue-28 --domain my-domain.com';
    const stdout = execSync(command, { encoding: 'utf-8' });

    expect(stdout).toBe('http://issue-28.my-domain.com');
  });

  it('for main branch, prints link that equal to specified domain', () => {
    expect.hasAssertions();

    const command = 'yarn -s deployment print-link --branch-ref origin/main --domain my-domain.com';
    const stdout = execSync(command, { encoding: 'utf-8' });

    expect(stdout).toBe('http://my-domain.com');
  });
});
