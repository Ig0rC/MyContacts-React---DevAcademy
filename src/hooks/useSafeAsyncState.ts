import {
  useState, useCallback,
} from 'react';
import useIsMounted from './useIsMounted';

function useSafeAsyncState<T>(initialState: T): [T, (data: T) => void] {
  const [state, setState] = useState<T>(initialState);

  const isMounted = useIsMounted();

  const setSafeAsyncState = useCallback((data: T) => {
    if (isMounted()) {
      setState(data);
    }
  }, [isMounted]);

  return [state, setSafeAsyncState];
}

export default useSafeAsyncState;
