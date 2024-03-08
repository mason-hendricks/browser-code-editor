import { useTypedSelector } from '../../hooks/use-typed-selector';
import CellListItem from '../cell-list-item/cell-list-item';
import AddCell from '../add-cell/add-cell';
import { useActions } from '../../hooks/use-actions';
import { Fragment, useEffect } from 'react';
import './cell-list.css';

const CellList: React.FC = () => {
  // get cells in ordered list
  const cells = useTypedSelector(({ cells: { order, data } }) =>
    order.map((id) => data[id])
  );

  const { fetchCells, saveCells } = useActions();

  useEffect(() => {
    fetchCells();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    saveCells();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cellList = cells.map((cell) => {
    return (
      <Fragment key={cell.id}>
        <CellListItem cell={cell} />
        <AddCell previousCellId={cell.id} />
      </Fragment>
    );
  });

  return (
    <div className='cell-list'>
      <AddCell forceVisible={cells.length === 0} previousCellId={null} />
      {cellList}
    </div>
  );
};

export default CellList;
