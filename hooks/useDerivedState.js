
import { useCallback } from 'react';
import { isFunction } from '@twipped/utils/types';
import shallowEqual from '@twipped/utils/shallowEqual';
import deepEqual from '@twipped/utils/deepEqual';

import useUpdateEffect from './useUpdateEffect.js';
import useStableMemo from './useStableMemo.js';
import useGettableState from './useGettableState.js';

/**
 * Creates a state hook populated by a value derived from dependencies.
 * If the dependencies change, the state will be repopulated based on the
 * new dependencies, IF the results differ.
 * Invoking setState.reset() will change the state back to the last derived value.
 *
 * @function useDerivedState
 * @param  {Function} fn Handler to run at initialization and when a dependency changes
 * @param  {Array}    dependencies A dependency array
 * @param {Object} [options]
 * @param  {boolean|{Function(a: any, b: any)}} [options.comparator=false] A function
 * to evaluate if the result of the handler differs from current state. Pass true to perform
 * a deep equal, otherwise the comparison will be shallow.
 * @param  {boolean}   [options.alwaysMerge=false] Always merge the new state into the old.
 * @param  {boolean}   [options.alwaysUpdate=false] Always trigger an update even if state matches.
 * @param  {boolean|{Function(a: any, b: any)}} [options.comparison=false] When alwaysUpdate
 * is false, the comparison function provided will evaluate if the new state differs from the
 * old state. Pass true to perform a deep equal, otherwise the comparison will be shallow.
 * @returns {[state: any, setState: Function, getState: Function]} A three item
 * array containing: state, setState, getState
 */
export default function useDerivedState (
  fn,
  dependencies = [ fn ],
  { comparator = shallowEqual, ...ops } = {}
) {
  // eslint-disable-next-line no-param-reassign
  if (comparator === true) comparator = deepEqual;

  if (!isFunction(fn)) {
    throw new TypeError('useDerivedState did not receive a function for first argument.');
  }

  const initial = useStableMemo(fn, dependencies);

  const [ state, writeState, readState ] = useGettableState(initial, ops);
  useUpdateEffect(() => {
    const diff = !comparator(state, initial);
    if (diff) {
      writeState(initial);
    }
  }, [ initial, ...dependencies ]);

  writeState.reset = useCallback(() => writeState(initial), [ writeState, initial ]);

  return [ state, writeState, readState ];
}
