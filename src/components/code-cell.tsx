import { useEffect } from 'react';
import { useCumulativeCode } from '../hooks/use-cumulative-code';
import CodeEditor from '../components/code-editor';
import 'bulmaswatch/superhero/bulmaswatch.min.css';
import Preview from '../components/preview';
import Resizeable from './resizable';
import { Cell } from '../state';
import { useActions } from '../hooks/use-actions';
import { useTypedSelector } from '../hooks/use-typed-selector';
import './code-cell.css';

interface CodeCellProps {
  cell: Cell;
}

// reminder to install packages with npm install {packageName} --legacy-peer-deps to avoid errors
const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const { updateCell, createBundle } = useActions();
  const cumulativeCode = useCumulativeCode(cell.id);

  // use typed selector to get bundles state
  const bundle = useTypedSelector((state) => state.bundles[cell.id]);

  // method to handle running code from other code cells

  useEffect(() => {
    if (!bundle) {
      createBundle(cell.id, cumulativeCode);
      return;
    }

    const timer = setTimeout(async () => {
      createBundle(cell.id, cumulativeCode);
    }, 750);

    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cumulativeCode, cell.id, createBundle]);

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

        <div className='progress-wrapper'>
          {!bundle || bundle.loading ? (
            <div className='progress-cover'>
              <progress className='progress is-small is-primary' max='100'>
                Loading
              </progress>
            </div>
          ) : (
            <Preview code={bundle.code} errorMsg={bundle.error} />
          )}
        </div>
      </div>
    </Resizeable>
  );
};

export default CodeCell;
