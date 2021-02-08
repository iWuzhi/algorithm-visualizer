/**
 * author iWuzhi
 * date 2021-01-08 17:25:45
 */

import React, { useRef, useState } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import cx from 'classnames';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { green, purple } from '@material-ui/core/colors';

import CodeEditor from '@/components/CodeEditor';
import TwoDSort, { IRef as TwoDSortIRef } from '@/components/visualizes/TwoDSort';
import insertSortCode from '@/algorithms/sort/insert-sort';
import Toolbar from '@/components/Toolbar';

import Nav from './Nav';

import { useStyles } from './style';
const theme = createMuiTheme({});

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
    <ThemeProvider theme={theme}>
      <Router>
        <header
          className={cx(
            styles.header,
            'shadow-md',
            'flex items-center justify-center text-green-500 font-serif italic font-semibold tracking-wide'
          )}
        >
          ALGORITHM VISUALIZER
        </header>

        <main className={cx(styles.main, 'flex')}>
          <Nav />
          <Route path="/:category/:section">
            <section className="flex flex-col flex-grow">
              <Toolbar
                actions={[
                  {
                    name: 'Reset',
                    type: 'secondary',
                    onClick: onPlay,
                  },
                  {
                    name: 'Play',
                    type: 'primary',
                    onClick: onPlay,
                  },
                ]}
              />
              <div className="flex flex-grow">
                <div className="flex-grow">
                  <TwoDSort ref={viewRef} source={source} />
                </div>
                <div className="flex-grow">
                  <CodeEditor value={code} onChange={onCodeChange} />
                </div>
              </div>
            </section>
          </Route>
        </main>
      </Router>
    </ThemeProvider>
  );
};

export default App;
