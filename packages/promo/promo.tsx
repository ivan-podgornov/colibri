import React, { FC } from 'react';

export interface PromoProps {
  greetings: string;
}

const Promo: FC<PromoProps> = (props) => {
  const { greetings } = props;

  return (
    <div className="promo">
      <h1>{greetings}</h1>
    </div>
  );
};

export default Promo;
