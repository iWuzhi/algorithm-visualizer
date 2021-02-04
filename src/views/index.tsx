/**
 * author iWuzhi
 * date 2021-01-08 17:25:45
 */

import React, { useRef } from 'react';
import { Button } from 'gk-rc';

import CodeEditor from '@/components/CodeEditor';
import TwoDSort, { IRef as TwoDSortIRef } from '@/components/visualizes/TwoDSort';

import { useStyles } from './style';

const App: React.FC<unknown> = () => {
  const styles = useStyles();

  const viewRef = useRef<TwoDSortIRef>();
  const onClick = () => {
    viewRef.current && viewRef.current.swapTwoItems(0, 1);
  };

  return (
    <>
      <header className={styles.header}></header>
      <main className={styles.main}>
        <nav></nav>
        <section>
          <div className={styles.visualizer}>
            <TwoDSort ref={viewRef} />
            <Button onClick={onClick}>Click me !</Button>
          </div>
          <div className={styles.code}>
            <CodeEditor />
          </div>
        </section>
      </main>
    </>
  );
};

export default App;
