import { produce } from 'immer';
import { ActionType } from '../action-types';
import { Action } from '../actions';

interface BundleState {
  [key: string]:
    | {
        loading: boolean;
        code: string;
        error: string;
      }
    | undefined;
}

const initial: BundleState = {};

// REDUX REDUCER FUNCTION
// function to define bundle state

const bundlesReducer = produce(
  (state: BundleState = initial, action: Action): BundleState => {
    switch (action.type) {
      case ActionType.BUNDLE_START:
        // create direct mutation for bundle start state
        // clear bundle state
        state[action.payload.cellId] = {
          loading: true,
          code: '',
          error: '',
        };
        return state;

      // assign bundle payload to state upon
      // completion
      case ActionType.BUNDLE_COMPLETE:
        state[action.payload.cellId] = {
          loading: false,
          code: action.payload.bundle.code,
          error: action.payload.bundle.error,
        };
        return state;

      default:
        return state;
    }
  },

  // add initial state as second arg
  // to immer produce function
  // to avoid TS error
  initial
);

export default bundlesReducer;
