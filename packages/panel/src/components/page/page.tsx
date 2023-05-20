import React, { lazy, useState, Suspense } from 'react';
import { Layout, ConfigProvider, theme } from 'antd';
import { getLazyComponent } from '../../utils/load-component';

import { ContentEditor, ContentElement } from '../content-editor';
import styles from './page.module.css';

export function Page() {
  const [content, setContent] = useState<ContentElement[]>([
    {
      componentData: {
        packageName: 'colibri_components',
        componentName: 'Promo',
        src: 'http://localhost:3001/',
      },
      componentProps: { greetings: "Hello! I'm remote component Promo" },
    },
    {
      componentData: {
        packageName: 'colibri_components',
        componentName: 'User',
        src: 'http://localhost:3001/',
      },
      componentProps: {
        firstName: 'Peet',
        surname: 'Peeterson',
        age: 26,
      },
    },
  ]);

  return (
    <Layout className={styles.layout} hasSider>
      <Layout.Content>
        {content.map((element, i) => {
          const Component = lazy(() => getLazyComponent(element));

          return (
            <Suspense key={i} fallback={<strong>Loading error</strong>}>
              <Component {...element.componentProps} />
            </Suspense>
          );
        })}
      </Layout.Content>
      <Layout.Sider className={styles.sidebar} width="350">
        <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
          <ContentEditor content={content} onChange={setContent} />
        </ConfigProvider>
      </Layout.Sider>
    </Layout>
  );
}
