import { useTypedSelector } from '../hooks/use-typed-selector';
import CellListItem from './cell-list-item';

const CellList: React.FC = () => {
  // get cells in ordered list
  const cells = useTypedSelector(({ cells: { order, data } }) =>
    order.map((id) => data[id])
  );

  const cellList = cells.map((cell) => {
    return <CellListItem key={cell.id} cell={cell} />;
  });

  return <div>{cellList}</div>;
};

export default CellList;
