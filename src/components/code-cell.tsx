import { useState, useEffect } from 'react';
import CodeEditor from '../components/code-editor';
import 'bulmaswatch/superhero/bulmaswatch.min.css';
import Preview from '../components/preview';
import Bundler from '../bundler';
import Resizeable from './resizable';
import { Cell } from '../state';
import { useActions } from '../hooks/use-actions';

interface CodeCellProps {
  cell: Cell;
}

// reminder to install packages with npm install {packageName} --legacy-peer-deps to avoid errors
const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const [code, setCode] = useState('');
  const [err, setErr] = useState<string | Error>('');
  const { updateCell } = useActions();

  useEffect(() => {
    const timer = setTimeout(async () => {
      const result = await Bundler(cell.content);
      setCode(result.code);
      setErr(result.error);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [cell.content]);

  return (
    <Resizeable direction='vertical'>
      <div
        style={{
          height: 'calc(100% - 10px)',
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <Resizeable direction='horizontal'>
          <CodeEditor
            initialValue={cell.content}
            onChange={(value) => updateCell(cell.id, value)}
          />
        </Resizeable>
        <Preview code={code} errorMsg={String(err)} />
      </div>
    </Resizeable>
  );
};

export default CodeCell;
