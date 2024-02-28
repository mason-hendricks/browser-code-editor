import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { RootState } from '../state';

// custom hook that plugs into redux store to get typing of data
// stored within
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
