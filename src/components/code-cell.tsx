import { useState } from 'react';
import CodeEditor from '../components/code-editor';
import 'bulmaswatch/superhero/bulmaswatch.min.css';
import Preview from '../components/preview';
import Bundler from '../bundler';
import Resizeable from './resizable';

// reminder to install packages with npm install {packageName} --legacy-peer-deps to avoid errors
const CodeCell = () => {
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');

  const onClick = async () => {
    const result = await Bundler(input);
    setCode(result);
  };

  return (
    <Resizeable direction='vertical'>
      <div style={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
        <Resizeable direction='horizontal'>
          <CodeEditor
            initialValue='const a = 1;'
            onChange={(value) => setInput(value)}
          />
        </Resizeable>
        <Preview code={code} />
      </div>
    </Resizeable>
  );
};

export default CodeCell;
