
import useImmediateUpdateEffect from './useImmediateUpdateEffect.js';
import { useCallback } from 'react';
import useStableMemo from './useStableMemo.js';
import useGettableState from './useGettableState.js';

import { isFunction } from '@twipped/utils/types';
import shallowEqual from '@twipped/utils/shallowEqual';
import deepEqual from '@twipped/utils/deepEqual';

const shallow = (...args) => !shallowEqual(...args);
const deep = (...args) => !deepEqual(...args);

/**
 * @typedef StateHookInterface
 * @type {Array}
 * @property {any}      0 The current state
 * @property {Function} 1 State setter function
 * @property {Function} 2 State getter function
 */

/**
 * Creates a state hook populated by a value derived from dependencies.
 * If the dependencies change, the state will be repopulated based on the
 * Invoking setState.reset() will change the state back to the last derived value.
 *
 * @function useDerivedState
 * @param  {Function} fn Handler to run at initialization and when a dependency changes
 * @param  {Array}    dependencies A dependency array
 * @param  {Object}   options
 * @param  {Function} options.comparator   A function to evaluate if the result
 * of the handler differs from current state
 * @returns {StateHookInterface} Returns an array containing the current state,
 * an updater function and a getter function.
 */
export default function useDerivedState (fn, dependencies = [ fn ], { comparator = shallow, ...ops } = {}) {
  if (comparator === true) comparator = deep;

  if (!isFunction(fn)) {
    const v = fn;
    fn = () => v;
  }

  const initial = useStableMemo(fn, dependencies);

  var [ state, writeState, readState ] = useGettableState(initial, ops);
  useImmediateUpdateEffect(() => {
    const diff = comparator(state, initial);
    if (diff) {
      setTimeout(() => writeState(initial));
    }
    // console.log({ state, initial, diff });
  }, [ initial, ...dependencies ]);

  writeState.reset = useCallback(() => writeState(initial), [ writeState, initial ]);

  return [ state, writeState, readState ];
}
