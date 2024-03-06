import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../state';
import { useMemo } from 'react';

// custom hook to bind action creators and make them useable
// in other files
export const useActions = () => {
  const dispatch = useDispatch();

  // useMemo call to prevent rerenders
  // from this useAction hook being continuously called
  return useMemo(() => {
    return bindActionCreators(actionCreators, dispatch);
  }, [dispatch]);
};
