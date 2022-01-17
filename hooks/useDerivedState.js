
import useImmediateUpdateEffect from './useImmediateUpdateEffect';
import { useCallback } from 'react';
import useStableMemo from './useStableMemo';
import useGettableState from './useGettableState';

import { shallowEqual, deepEqual, isFunction } from '@twipped/utils';

const shallow = (...args) => !shallowEqual(...args);
const deep = (...args) => !deepEqual(...args);

/**
 * Creates a state hook populated by a value derived from dependencies.
 * If the dependencies change, the state will be repopulated based on the new dependencies, IF the results differ.
 * Invoking setState.reset() will change the state back to the last derived value.
 * @param  {Function}     fn         Handler to run at initialization and when a dependency changes
 * @param  {Array<mixed>} deps       A dependency array
 * @param  {Function}     comparator A function to evaluate if the result of the handler differs from current state
 * @return {[mixed, Function]} Returns a tuple containing the current state and an updater function.
 */
export default function useDerivedState (fn, deps = [ fn ], { comparator = shallow, ...ops } = {}) {
  if (comparator === true) comparator = deep;

  if (!isFunction(fn)) {
    const v = fn;
    fn = () => v;
  }

  const initial = useStableMemo(fn, deps);

  var [ state, writeState, readState ] = useGettableState(initial, ops);
  useImmediateUpdateEffect(() => {
    const diff = comparator(state, initial);
    if (diff) {
      setTimeout(() => writeState(initial));
    }
    // console.log({ state, initial, diff });
  }, [ initial, ...deps ]);

  writeState.reset = useCallback(() => writeState(initial), [ writeState, initial ]);

  return [ state, writeState, readState ];
}
