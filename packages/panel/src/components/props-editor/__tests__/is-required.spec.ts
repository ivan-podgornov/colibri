import PropTypes from 'prop-types';
import { isRequired } from '../utils';

describe('isRequired', () => {
  it('should return true for required validators', () => {
    expect.assertions(2);
    expect(isRequired(PropTypes.string.isRequired)).toBe(true);
    expect(isRequired(PropTypes.number.isRequired)).toBe(true);
  });

  it('should return false for non-required validators', () => {
    expect.assertions(2);
    expect(isRequired(PropTypes.string)).toBe(false);
    expect(isRequired(PropTypes.number)).toBe(false);
  });
});
