

import { isObject } from '@twipped/utils';
import { useRef } from 'react';
import areHookInputsEqual from './areHookInputsEqual';
import dft from './default';

/**
 * Functions identical to useMemo, except takes the entire props object and only
 * recomputes if the props change.
 *
 * @param  {object} obj The object to memoize.
 * @return {object} The first instance of the object passed.
 */
export default function usePropsMemo (props, fn) {
  const resultRef = useRef(dft);

  if (!isObject(props, true)) throw new TypeError('Did not receive a props object');
  if (resultRef.current === dft || !areHookInputsEqual(props, resultRef.current[0])) {
    resultRef.current = [ props, fn() ];
    return resultRef.current[1];
  }
  return resultRef.current[1];
}
