
import { useRef } from 'react';
import { shallowEqual, deepEqual } from '@twipped/utils';

/**
 * Identical to `useCallback` _except_ that it provides a semantic guarantee that
 * function will not be invalidated unless the dependencies change. Dependencies may
 * be an array or an object.
 *
 * @param fn A function that returns a value to be memoized
 * @param deps A dependency array
 * @param  {Boolean}  options.comparison The comparison function used to detect if
 * the dependencies change. Defaults to a shallow equal, pass true to use deep equality.
 * @returns {Function}
 */
export default function useStableCallback (fn, deps, { comparison = false }) {
  if (comparison === false) comparison = shallowEqual;
  if (comparison === true) comparison = deepEqual;

  let isValid = true;

  const valueRef = useRef();

  if (valueRef.current) {
    isValid = !!(
      deps &&
      valueRef.current.deps &&
      comparison(deps, valueRef.current.deps)
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
