/**
 * author iWuzhi
 * date 2021-01-08 17:25:45
 */

import React, { useRef, useState } from 'react';
import { Button } from 'gk-rc';

import CodeEditor from '@/components/CodeEditor';
import TwoDSort, { IRef as TwoDSortIRef } from '@/components/visualizes/TwoDSort';
import insertSortCode from '@/algorithms/sort/insert-sort';

import { useStyles } from './style';

const App: React.FC<unknown> = () => {
  const styles = useStyles();

  const viewRef = useRef<TwoDSortIRef>();
  const [source, _setSource] = useState<number[]>([]);

  const saveCode = sessionStorage.getItem('code');
  const [code, setCode] = useState<string>(saveCode ?? insertSortCode.toString());

  const executeCommonds = (commonds: [number, number][]) => {
    commonds.forEach((cmd, index) => {
      const [a, b] = cmd;
      setTimeout(() => {
        viewRef.current.swapTwoItems(a, b);
      }, index * 1400);
    });
  };

  let commonds: [number, number][] = [];
  // TODO: API  定义
  const onPlay = () => {
    commonds = [];
    const swapTwoItems = (a: number, b: number) => {
      commonds.push([a, b]);
    };
    const run = () => {
      executeCommonds(commonds);
    };
    const setSource = (source: number[]) => {
      _setSource(source);
    };
    eval(code);
  };
  const onCodeChange = (val: string) => {
    sessionStorage.setItem('code', val);
    setCode(val);
    val.split('\n').some((line) => {
      const [, , _souce] = line.match(/(insertSort\(\[(.+)\])/) || [];
      if (_souce) {
        _setSource(
          _souce
            .split(',')
            .filter((i) => !!i)
            .map(Number)
        );
        return true;
      }
      return false;
    });
  };
  return (
    <>
      <header className={styles.header}>
        <Button variant="contained" color="primary" className="float-right" onClick={onPlay}>
          Play
        </Button>
      </header>
      <main className={styles.main}>
        <nav></nav>
        <section>
          <div className={styles.visualizer}>
            <TwoDSort ref={viewRef} source={source} />
          </div>
          <div className={styles.code}>
            <CodeEditor value={code} onChange={onCodeChange} />
          </div>
        </section>
      </main>
    </>
  );
};

export default App;
