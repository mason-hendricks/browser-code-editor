import { useEffect, useCallback } from 'react';
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

  // use typed selector to get bundles state
  const bundle = useTypedSelector((state) => state.bundles[cell.id]);

  // method to handle running code from other code cells
  const { data, order } = useTypedSelector((state) => state.cells);
  const cumulativeCode = useCallback(() => {
    // produce ordered array of all cells
    const orderedCells = order.map((id) => data[id]);
    const cumulativeCode = [];

    // if cells in order are code cells,
    // grab and push their contents
    for (const c of orderedCells) {
      if (c.type === 'CODE') {
        cumulativeCode.push(c.content);
      }

      // break early if ids match current code
      // cell of this component
      if (c.id === cell.id) {
        break;
      }
    }

    return cumulativeCode;
  }, [order, data, cell.id]);

  useEffect(() => {
    if (!bundle) {
      createBundle(cell.id, cumulativeCode().join('\n'));
      return;
    }

    const timer = setTimeout(async () => {
      createBundle(cell.id, cumulativeCode().join('\n'));
    }, 750);
    return () => {
      clearTimeout(timer);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cell.id, cumulativeCode().join('\n'), createBundle]);

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
