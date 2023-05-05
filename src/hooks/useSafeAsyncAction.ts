import { useCallback } from 'react';
import useIsMounted from './useIsMounted';

function useSafeAsyncAction(): (callback: () => void) => void {
  const isMounted = useIsMounted();

  const runSafeAsyncState = useCallback((callback: () => void) => {
    if (isMounted()) {
      callback();
    }
  }, [isMounted]);

  return runSafeAsyncState;
}

export default useSafeAsyncAction;
