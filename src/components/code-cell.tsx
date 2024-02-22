import { useState } from 'react';
import CodeEditor from '../components/code-editor';
import 'bulmaswatch/superhero/bulmaswatch.min.css';
import Preview from '../components/preview';
import Bundler from '../bundler';

// reminder to install packages with npm install {packageName} --legacy-peer-deps to avoid errors
const CodeCell = () => {
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');

  const onClick = async () => {
    const result = await Bundler(input);
    setCode(result);
  };

  return (
    <div>
      <CodeEditor
        initialValue='const a = 1;'
        onChange={(value) => setInput(value)}
      />
      <div>
        <button onClick={onClick}>Submit</button>
      </div>

      <Preview code={code} />
    </div>
  );
};

export default CodeCell;
