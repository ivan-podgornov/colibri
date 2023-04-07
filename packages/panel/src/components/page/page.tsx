import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { ContentEditor } from '../content-editor';
import styles from './page.module.css';

export function Page() {
  const RemoteComponent = dynamic(
    // eslint-disable-next-line
    // @ts-ignore - strange error
    () => import('../remote-component').then((mod) => mod.RemoteComponent),
    {
      ssr: false,
    }
  );

  const [content, setContent] = useState<any[]>([]);

  useEffect(() => {
    const rawContent = localStorage.getItem('content');
    setContent(rawContent ? JSON.parse(rawContent) : []);
  }, []);

  const changeContentHandler = (newContent: any[]) => {
    const rawContent = JSON.stringify(newContent);
    localStorage.setItem('content', rawContent);
    setContent(newContent);
  };

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        {content.map((item, i) => (
          <RemoteComponent key={i} {...item} />
        ))}
      </div>
      <ContentEditor content={content} onChange={changeContentHandler} />
    </div>
  );
}
