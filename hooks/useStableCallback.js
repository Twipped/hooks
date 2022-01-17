
import { useRef } from 'react';
import areHookInputsEqual from './areHookInputsEqual';

/**
 * Identical to `useCallback` _except_ that it provides a semantic guarantee that
 * function will not be invalidated unless the dependencies change. This version does
 * not complain if the length of the dependencies change.
 *
 * @param fn A function that returns a value to be memoized
 * @param deps A dependency array
 */
export default function useStableCallback (fn, deps) {
  let isValid = true;

  const valueRef = useRef();

  if (valueRef.current) {
    isValid = !!(
      deps &&
      valueRef.current.deps &&
      areHookInputsEqual(deps, valueRef.current.deps)
    );
  } else {
    valueRef.current = {
      deps,
      fn,
    };
  }

  const cache = isValid ? valueRef.current : { deps, fn };
  // must update immediately so any sync renders here don't cause an infinite loop
  valueRef.current = cache;

  return cache.fn;
}
