
import { useRef } from 'react';
import areHookInputsEqual from './areHookInputsEqual';
import { shallowEqual, deepEqual } from '@twipped/utils';

/**
 * Identical to `useMemo` _except_ that it provides a semantic guarantee that
 * values will not be invalidated unless the dependencies change. This is unlike
 * the built in `useMemo` which may discard memoized values for performance reasons.
 *
 * @function useStableMemo
 * @param {Function}  factory      A function that returns a value to be memoized
 * @param {Array}     dependencies A dependency array
 * @param {object}    options
 * @param {boolean}   options.comparison The comparison function used to detect if
 * the dependencies change. Defaults to a shallow equal, pass true to use deep equality.
 * @returns {any}
 */
export default function useStableMemo (factory, dependencies, { comparison = areHookInputsEqual } = {}) {
  if (comparison === false) comparison = shallowEqual;
  if (comparison === true) comparison = deepEqual;

  let isValid = true;

  const valueRef = useRef();

  if (valueRef.current) {
    isValid = !dependencies || !!(
      dependencies &&
      valueRef.current.dependencies &&
      comparison(dependencies, valueRef.current.dependencies)
    );
  } else {
    valueRef.current = {
      dependencies,
      result: factory(),
    };
  }

  const cache = isValid ? valueRef.current : { dependencies, result: factory() };
  // must update immediately so any sync renders here don't cause an infinite loop
  valueRef.current = cache;

  return cache.result;
}
