/**
 * author iWuzhi
 * date 2021-01-08 17:25:45
 */

import React from 'react';
import { useStyles } from './style';
import CodeEditor from '@/components/CodeEditor';

interface IProps {}

const App: React.FC<IProps> = () => {
  const styles = useStyles();
  return (
    <>
      <header className={styles.header}></header>
      <main className={styles.main}>
        <nav></nav>
        <section>
          <div className={styles.visualizer}></div>
          <div className={styles.code}>
            <CodeEditor />
          </div>
        </section>
      </main>
    </>
  );
};

export default App;
