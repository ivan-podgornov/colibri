import React from 'react';
import PropTypes from 'prop-types';

export function User(props) {
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
