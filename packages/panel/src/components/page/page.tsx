import React, { lazy, useState, Suspense } from 'react';
import { Layout, ConfigProvider, theme } from 'antd';
import { getLazyComponent } from '../../utils/load-component';

import { ContentEditor, ContentElement } from '../content-editor';
import styles from './page.module.css';

export function Page() {
  const [content, setContent] = useState<ContentElement[]>([]);

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
