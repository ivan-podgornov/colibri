import React from 'react';

interface Props {
  greetings: string;
}

export function Promo(props: Props) {
  const { greetings } = props;

  return (
    <div className="promo">
      <h1>{greetings}</h1>
    </div>
  );
};
