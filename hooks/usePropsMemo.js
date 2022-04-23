
import { useRef } from 'react';
import { DEFAULT, shallowEqual, deepEqual, isObject } from '@twipped/utils';

/**
 * Functionally identical to useMemo, except it takes a dependency object
 * instead of an array (presumably a components props argument).
 *
 * @function usePropsMemo
 * @param  {Function} factory Function to memoize
 * @param  {Object}   props Dependencies
 * @param  {Object}   [options] Options
 * @param  {boolean}  [options.comparison] The comparison function used to detect if
 * the dependencies change. Defaults to a shallow equal, pass true to use deep equality.
 * @returns {any} The result of the factory function.
 */
export default function usePropsMemo (factory, props, { comparison = false } = {}) {
  if (comparison === false) comparison = shallowEqual;
  if (comparison === true) comparison = deepEqual;

  const resultRef = useRef(DEFAULT);

  if (!isObject(props, true)) throw new TypeError('Did not receive a props object');
  if (resultRef.current === DEFAULT || !comparison(props, resultRef.current[0])) {
    resultRef.current = [ props, factory() ];
    return resultRef.current[1];
  }
  return resultRef.current[1];
}
