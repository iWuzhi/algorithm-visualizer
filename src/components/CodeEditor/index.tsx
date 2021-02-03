import React from 'react';
import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/theme-github';

import insertSortCode from '../../algorithms/sort/insert-sort';

// TODO: toString ingore ts error
// TODO: Webpack asstet/source 格式太对
const sourceCode = insertSortCode
  .toString()
  .split('\n')
  .reduce((target, line) => {
    if (line.includes('@source include')) {
      target.push(line.replace(/^\/\/\s+/, ''));
    } else if (!line.includes('@source exclude')) {
      target.push(line);
    }
    return target;
  }, []);

const CodeEditor = () => {
  const onChange = (newValue: any) => {
    console.log('change', newValue);
  };
  return (
    <AceEditor
      mode="javascript"
      theme="github"
      onChange={onChange}
      name="ace-editor"
      placeholder="Empty"
      height="100%"
      width="100%"
      editorProps={{ $blockScrolling: true }}
      value={sourceCode.join('\n')}
    />
  );
};

export default CodeEditor;
