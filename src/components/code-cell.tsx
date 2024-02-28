import { useState, useEffect } from 'react';
import CodeEditor from '../components/code-editor';
import 'bulmaswatch/superhero/bulmaswatch.min.css';
import Preview from '../components/preview';
import Bundler from '../bundler';
import Resizeable from './resizable';
import { Cell } from '../state';

interface CodeCellProps {
  cell: Cell;
}

// reminder to install packages with npm install {packageName} --legacy-peer-deps to avoid errors
const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');
  const [err, setErr] = useState<string | Error>('');

  useEffect(() => {
    const timer = setTimeout(async () => {
      const result = await Bundler(input);
      setCode(result.code);
      setErr(result.error);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [input]);

  return (
    <Resizeable direction='vertical'>
      <div style={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
        <Resizeable direction='horizontal'>
          <CodeEditor
            initialValue='const a = 1;'
            onChange={(value) => setInput(value)}
          />
        </Resizeable>
        <Preview code={code} errorMsg={String(err)} />
      </div>
    </Resizeable>
  );
};

export default CodeCell;
