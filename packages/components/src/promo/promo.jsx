import React from 'react';
import PropTypes from 'prop-types';

export const Promo = (props) => {
  const { greetings } = props;

  return (
    <div className="promo">
      <h1>{greetings}</h1>
    </div>
  );
};

Promo.propTypes = {
  greetings: PropTypes.string.isRequired,
};
