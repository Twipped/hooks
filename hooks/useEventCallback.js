
import { useCallback } from 'react';
import useCommittedRef from './useCommittedRef';

/**
 * Wraps a callback so that the most recent version is always the one invoked.
 * @param  {Function} fn
 * @return {Function}
 */
export default function useEventCallback (fn) {
  const ref = useCommittedRef(fn);
  return useCallback((...args) => ref.current && ref.current(...args), [ ref ]);
}
