import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { Layout, ConfigProvider, theme } from 'antd';

import { ContentEditor, ContentElement } from '../content-editor';
import styles from './page.module.css';

export function Page() {
  const RemoteComponent = dynamic(
    () =>
      // eslint-disable-next-line
      // @ts-ignore - strange error
      import('../remote-component/remote-component').then((mod) => mod.RemoteComponent),
    {
      ssr: false,
    }
  );

  const [content, setContent] = useState<ContentElement[]>([]);

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
    <Layout className={styles.layout} hasSider>
      <Layout.Content>
        {content.map((item, i) => (
          <RemoteComponent key={i} {...item} />
        ))}
      </Layout.Content>
      <Layout.Sider className={styles.sidebar} width="350">
        <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
          <ContentEditor content={content} onChange={changeContentHandler} />
        </ConfigProvider>
      </Layout.Sider>
    </Layout>
  );
}
