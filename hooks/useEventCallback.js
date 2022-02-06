
import { useRef, useCallback } from 'react';

/**
 * Wraps a callback so that the most recent version is always the one invoked.
 * @param  {Function} fn
 * @return {Function}
 */
export default function useEventCallback (fn) {
  const ref = useRef(fn);
  ref.current = fn;
  return useCallback((...args) => ref.current && ref.current(...args), [ ref ]);
}
