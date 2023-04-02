import React from 'react';

interface Props {
  firstName: string;
  surname: string;
}

export function User(props: Props) {
  const { firstName, surname } = props;

  return (
    <dl>
      <div>
        <dt>First name:</dt>
        <dd>{firstName}</dd>
      </div>
      <div>
        <dt>Surname:</dt>
        <dd>{surname}</dd>
      </div>
    </dl>
  )
}
