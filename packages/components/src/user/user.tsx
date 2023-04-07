import React from 'react';
import PropTypes from 'prop-types';

interface Props {
  age: number;
  firstName: string;
  surname: string;
}

export function User(props: Props) {
  const { age, firstName, surname } = props;

  return (
    <dl>
      <div>
        <dt>Age:</dt>
        <dd>{age}</dd>
      </div>
      <div>
        <dt>First name:</dt>
        <dd>{firstName}</dd>
      </div>
      <div>
        <dt>Surname:</dt>
        <dd>{surname}</dd>
      </div>
    </dl>
  );
}

User.propTypes = {
  age: PropTypes.number.isRequired,
  firstName: PropTypes.string.isRequired,
  surname: PropTypes.string.isRequired,
};
