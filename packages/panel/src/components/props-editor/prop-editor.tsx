import React, { ChangeEvent } from 'react';
import type { Validator } from 'prop-types';
import { getValidatorType, isRequired, ValidatorData } from './utils';

interface Props<T extends ValidatorData> {
  propName: string;
  validator: Validator<T>;
  value: T;
  onChange: (value: T) => void;
}

export function PropEditor<T extends ValidatorData>(props: Props<T>) {
  const { propName, validator, value, onChange } = props;

  const validatorType = getValidatorType(validator);
  const required = isRequired(validator);

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    switch (validatorType) {
      case 'string':
        return onChange(value as T);
      case 'number':
        return onChange(Number(value) as T);
      case 'unknown':
        return onChange(value as T);
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
