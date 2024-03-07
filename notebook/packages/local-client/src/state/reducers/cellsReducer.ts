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

// REDUX REDUCER FUNCTION
// controls what happens to each cell when one of these action types are called

const cellsReducer = produce(
  (state: CellState = initialState, action: Action) => {
    switch (action.type) {
      case ActionType.SAVE_CELLS_ERROR:
        state.error = action.payload;
        return state;

      case ActionType.FETCH_CELLS:
        state.loading = true;
        state.error = null;
        return state;

      case ActionType.FETCH_CELLS_COMPLETE:
        // take array of cell objects
        // use it to define state parameters
        state.order = action.payload.map((cell) => cell.id);
        state.data = action.payload.reduce((acc, cell) => {
          acc[cell.id] = cell;
          return acc;
        }, {} as CellState['data']);
        return state;

      case ActionType.FETCH_CELLS_ERROR:
        state.loading = false;
        state.error = action.payload;
        return state;

      case ActionType.UPDATE_CELL:
        const { id, content } = action.payload;
        state.data[id].content = content;
        return state;

      case ActionType.DELETE_CELL:
        // delete state data with immer delete function
        delete state.data[action.payload];

        // use array filtering to delete from ordering array
        state.order = state.order.filter((id) => id !== action.payload);
        return state;

      case ActionType.MOVE_CELL:
        // get direction and index
        const { direction } = action.payload;
        const index = state.order.findIndex((id) => id === action.payload.id);

        // get new index location
        const targetIndex = direction === 'UP' ? index - 1 : index + 1;

        // check for invalid array location
        if (targetIndex < 0 || targetIndex > state.order.length - 1) {
          return state;
        }

        // swap the cells
        state.order[index] = state.order[targetIndex];
        state.order[targetIndex] = action.payload.id;

        return state;
      case ActionType.INSERT_CELL_AFTER:
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

        // if index is not found, push to start of order
        // else, push it after that index
        if (foundIndex < 0) {
          state.order.unshift(cell.id);
        } else {
          state.order.splice(foundIndex + 1, 0, cell.id);
        }

        return state;
      default:
        return state;
    }
  },
  initialState
);

// function to create new cell ids
const generateId = () => {
  // create random number in base36 and convert to string
  // taking a small portion
  return Math.random().toString(36).substring(2, 5);
};

export default cellsReducer;
