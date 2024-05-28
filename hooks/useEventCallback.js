import { useRef, useCallback } from 'react';

/**
 * Wraps a callback so that the most recent version is always the one invoked.
 *
 * @function useEventCallback
 * @template {Function} T
 * @param  {T} fn The callback to wrap
 * @returns {T} The stable wrapped callback
 */
export default function useEventCallback (fn) {
  const ref = useRef(fn);
  ref.current = fn;

  // @ts-ignore
  return useCallback((...args) => ref.current && ref.current(...args), [ ref ]);
}
