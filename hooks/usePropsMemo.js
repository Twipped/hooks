

import { useRef } from 'react';
import dft from './default';
import { shallowEqual, deepEqual, isObject } from '@twipped/utils';

/**
 * Functionally identical to useMemo, except it takes a dependency object
 * instead of an array (presumably a components props argument).
 * @param  {Function} factory
 * @param  {Object}   props              [description]
 * @param  {Boolean}  options.comparison The comparison function used to detect if
 * the dependencies change. Defaults to a shallow equal, pass true to use deep equality.
 * @return {Mixed} The result of the factory function.
 */
export default function usePropsMemo (fn, props, { comparison = false } = {}) {
  if (comparison === false) comparison = shallowEqual;
  if (comparison === true) comparison = deepEqual;

  const resultRef = useRef(dft);

  if (!isObject(props, true)) throw new TypeError('Did not receive a props object');
  if (resultRef.current === dft || !comparison(props, resultRef.current[0])) {
    resultRef.current = [ props, fn() ];
    return resultRef.current[1];
  }
  return resultRef.current[1];
}
