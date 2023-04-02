import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { ContentEditor } from '../components/content-editor';

export default function PageIndex() {
  // @ts-ignore
  const RemoteComponent = dynamic(() => import('../components/remote-component'), {
    ssr: false,
  });

  const [content, setContent] = useState([
    {
      componentName: 'Promo',
      componentProps: { greetings: 'Hello' },
      moduleName: 'colibri_components',
      src: 'http://localhost:3001/remoteEntry.js',
    },
    {
      componentName: 'User',
      componentProps: {
        firstName: 'Peet',
        surname: 'Peeterson',
      },
      moduleName: 'colibri_components',
      src: 'http://localhost:3001/remoteEntry.js',
    },
  ]);

  return (
    <div>
      <ContentEditor defaultContent={content} onChange={setContent} />
      {content.map((item, i) => <RemoteComponent key={i} {...item} />)}
    </div>
  );
}
