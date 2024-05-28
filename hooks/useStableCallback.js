
import { useRef } from 'react';
import shallowEqual from '@twipped/utils/shallowEqual';
import deepEqual from '@twipped/utils/deepEqual';

/**
 * Identical to `useCallback` _except_ that it provides a semantic guarantee that
 * function will not be invalidated unless the dependencies change. Dependencies may
 * be an array or an object.
 *
 * @function useStableCallback
 * @param  {Function} fn            A function that returns a value to be memoized
 * @param  {Array}    dependencies  A dependency array
 * @param  {object}   options
 * @param  {Function|boolean}  options.comparison The comparison function used to detect if
 * the dependencies change. Defaults to a shallow equal, pass true to use deep equality.
 * @returns {Function}
 */
export default function useStableCallback (fn, dependencies, { comparison = false }) {
  if (comparison === false) comparison = shallowEqual;
  if (comparison === true) comparison = deepEqual;

  let isValid = true;

  /** @type {import('react').MutableRefObject<{ dependencies: any[]; fn: Function; }>} */
  const valueRef = useRef();

  if (valueRef.current) {
    isValid = !!(
      dependencies &&
      valueRef.current.dependencies &&
      comparison(dependencies, valueRef.current.dependencies)
    );
  } else {
    valueRef.current = {
      dependencies,
      fn,
    };
  }

  const cache = isValid ? valueRef.current : { dependencies, fn };
  // must update immediately so any sync renders here don't cause an infinite loop
  valueRef.current = cache;

  return cache.fn;
}
