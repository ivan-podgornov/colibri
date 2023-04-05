import React, { useMemo, ChangeEvent } from 'react';
import PropTypes, { Validator } from 'prop-types';

type ValidatorType = 'string' | 'number' | 'unknown'

interface ValidatorsData {
  string: string;
  number: number;
  unknown: string;
}

interface Props<T extends ValidatorsData[ValidatorType]> {
  propName: string;
  validator: Validator<T>;
  value: T;
  onChange: (value: T) => void;
}

export function PropEditor<T extends ValidatorsData[ValidatorType]>(props: Props<T>) {
  const { propName, validator, value, onChange } = props;

  const validatorType = useMemo((): ValidatorType => {
    switch (validator) {
      case PropTypes.string: return 'string';
      case PropTypes.string.isRequired: return 'string';
      case PropTypes.number: return 'number';
      case PropTypes.number.isRequired: return 'number';
      default: return 'unknown';
    }
  }, [validator]);

  const required = useMemo((): boolean => {
    switch (validator) {
      case PropTypes.string.isRequired: return true;
      case PropTypes.number.isRequired: return true;
      default: return false;
    }
  }, [validator]);

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    switch (validatorType) {
      case 'string': return onChange(value as T);
      case 'number': return onChange(Number(value) as T);
      case 'unknown': return onChange(value as T);
    }
  };

  return (
    <label style={{ display: 'block', marginBottom: 8 }}>
      <span>{propName}</span>
      {validatorType === 'unknown' ? (
        <span>Неизвестный тип валидатора</span>
      ) : (
        <input
          value={value}
          name={propName}
          required={required}
          type={validatorType === 'number' ? 'number' : 'text'}
          onChange={changeHandler}
        />
      )}
    </label>
  );
}
