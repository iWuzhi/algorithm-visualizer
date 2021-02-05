import React, { useEffect } from 'react';
import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/theme-github';

interface IProps {
  value: string;
  onChange: (val: string) => void;
}

// TODO: toString ingore ts error
// TODO: Webpack asstet/source 格式太对
const getCode = (source: string): string => {
  const lineArr = source.split('\n').reduce((target, line) => {
    if (line.includes('@source include')) {
      target.push(line.replace(/^\/\/\s+/, ''));
    } else if (!line.includes('@source exclude')) {
      target.push(line);
    }
    return target;
  }, []);
  return lineArr.join('\n');
};

const CodeEditor: React.FC<IProps> = (props) => {
  const { value } = props;
  const onChange = (val: string) => {
    props.onChange(getCode(val));
  };

  useEffect(() => {
    onChange(value);
  }, []);
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
      value={value}
    />
  );
};

export default CodeEditor;
