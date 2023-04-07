import PropTypes, { Validator, ValidationMap } from 'prop-types';

/** Data type for every validator type */
interface Validators {
  string: string;
  number: number;
  unknown: string;
}

type ValidatorType = keyof Validators;
export type ValidatorData = Validators[ValidatorType];

/** Check is validator required */
export function isRequired(validator: Validator<unknown>): boolean {
  const requiredValidators = [
    PropTypes.string.isRequired,
    PropTypes.number.isRequired,
  ];

  return requiredValidators.includes(validator as typeof requiredValidators[number]);
}

/** Returns default props for specified propTypes */
export function getDefaultProps<T>(propTypes: ValidationMap<T>): T {
  const entries = (Object.entries(propTypes) as [keyof T, Validator<ValidatorData>][])
    .map(([key, validator]) => [key, getDefaultValue(validator)]);

  return Object.fromEntries(entries);
}

/** Returns default value for validator */
export function getDefaultValue<T extends ValidatorData>(validator: Validator<T>): T {
  type ValidatorValues = {
    [T in ValidatorType]: Validators[T];
  }

  const values: ValidatorValues = {
    'string': '',
    'number': 0,
    'unknown': ''
  };

  return values[getValidatorType(validator)] as T;
}

/** Returns a string representation of specified validator */
export function getValidatorType<T extends ValidatorData>(validator: Validator<T>): ValidatorType {
  switch (validator) {
    case PropTypes.string: return 'string';
    case PropTypes.string.isRequired: return 'string';
    case PropTypes.number: return 'number';
    case PropTypes.number.isRequired: return 'number';
    default: return 'unknown';
  }
}
