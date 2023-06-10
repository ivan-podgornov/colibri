import React, { ChangeEvent } from 'react';
import type { Validator } from 'prop-types';
import { Form, Input } from 'antd';

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
    <Form.Item label={propName} required={required}>
      <Input
        autoComplete="off"
        name={propName}
        type={validatorType === 'number' ? 'number' : 'text'}
        value={value}
        onChange={changeHandler}
      />
    </Form.Item>
  );
}
