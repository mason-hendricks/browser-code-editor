import { ActionType } from '../action-types';
import { Action } from '../actions';
import { Cell } from '../cell';
import { produce } from 'immer';

interface CellState {
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    [key: string]: Cell;
  };
}

const initialState: CellState = {
  loading: false,
  error: null,
  order: [],
  data: {},
};

const cellsReducer = produce(
  (state: CellState = initialState, action: Action) => {
    switch (action.type) {
      case ActionType.UPDATE_CELL:
        const { id, content } = action.payload;
        state.data[id].content = content;
        return;

      case ActionType.DELETE_CELL:
        // delete state data with immer delete function
        delete state.data[action.payload];

        // use array filtering to delete from ordering array
        state.order = state.order.filter((id) => id !== action.payload);
        return;

      case ActionType.MOVE_CELL:
        // get direction and index
        const { direction } = action.payload;
        const index = state.order.findIndex((id) => id === action.payload.id);

        // get new index location
        const targetIndex = direction === 'UP' ? index - 1 : index + 1;

        // check for invalid array location
        if (targetIndex < 0 || targetIndex > state.order.length - 1) {
          return;
        }

        // swap the cells
        state.order[index] = state.order[targetIndex];
        state.order[targetIndex] = action.payload.id;

        return;
      case ActionType.INSERT_CELL_BEFORE:
        // create new cell

        const cell: Cell = {
          content: '',
          type: action.payload.type,
          id: generateId(),
        };

        state.data[cell.id] = cell;

        // check for index of cell to insert before
        const foundIndex = state.order.findIndex(
          (id) => id === action.payload.id
        );

        // if index is not found, push to end of order
        // else, push it before that index

        if (foundIndex < 0) {
          state.order.push(cell.id);
        } else {
          state.order.splice(foundIndex, 0, cell.id);
        }

        return;
      default:
        return state;
    }
  }
);

// function to create new cell ids
const generateId = () => {
  // create random number in base36 and convert to string
  // taking a small portion

  return Math.random().toString(36).substring(2, 5);
};

export default cellsReducer;
