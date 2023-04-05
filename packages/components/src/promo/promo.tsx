import React, { FC } from 'react';
import PropTypes from 'prop-types';

interface Props {
  greetings: string;
}

export const Promo: FC<Props> = (props: Props) => {
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
