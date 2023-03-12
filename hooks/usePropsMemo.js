
import { useRef } from 'react';
import { isObject, DEFAULT } from '@twipped/utils/types';
import shallowEqual from '@twipped/utils/shallowEqual';
import deepEqual from '@twipped/utils/deepEqual';

/**
 * Functionally identical to useMemo, except it takes a dependency object
 * instead of an array (presumably a components props argument).
 *
 * @function usePropsMemo
 * @param  {{Function: any}} factory Function to memoize
 * @param  {object | Array}   props Dependencies
 * @param  {Object}   [options] Options
 * @param  {boolean|{Function(a: any, b: any)}}  [options.comparison] The comparison
 * function used to detect if the dependencies change. Defaults to a shallow equal,
 * pass true to use deep equality.
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
