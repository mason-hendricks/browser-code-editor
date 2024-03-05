import { useActions } from '../../hooks/use-actions';
import './action-bar.css';

interface ActionBarProps {
  id: string;
}

const ActionBar: React.FC<ActionBarProps> = ({ id }) => {
  const { moveCell, deleteCell } = useActions();

  return (
    <div className='action-bar'>
      <button
        className='button is-primary is-small'
        onClick={() => moveCell(id, 'UP')}
      >
        <span className='icon'>
          <i className='fas fa-arrow-up' />
        </span>
      </button>
      <button
        className='button is-primary is-small'
        onClick={() => moveCell(id, 'DOWN')}
      >
        <span className='icon'>
          <i className='fas fa-arrow-down' />
        </span>
      </button>
      <button
        className='button is-primary is-small'
        onClick={() => deleteCell(id)}
      >
        <span className='icon'>
          <i className='fas fa-times' />
        </span>
      </button>
    </div>
  );
};

export default ActionBar;
