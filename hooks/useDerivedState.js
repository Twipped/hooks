import { isFunction } from '@twipped/utils/types';
import shallowEqual from '@twipped/utils/shallowEqual';
import deepEqual from '@twipped/utils/deepEqual';
import useStableMemo from './useStableMemo.js';
import useGettableState from './useGettableState.js';

/** @typedef {import('./types').StateHookInterface} StateHookInterface */

/**
 * Creates a state hook populated by a value derived from dependencies.
 * If the dependencies change, the state will be repopulated based on the
 * new dependencies, IF the results differ.
 * Invoking setState.reset() will change the state back to the last derived value.
 *
 * @function useDerivedState
 * @template S
 * @param  {() => S | any} fn Handler to run at initialization and when a dependency changes
 * @param  {any} dependencies A dependency array
 * @param  {object} [options]
 * @param  {boolean|((a: any, b: any) => boolean)} [options.comparator=false] A function
 * to evaluate if the result of the handler differs from current state. Pass true to perform
 * a deep equal, otherwise the comparison will be shallow.
 * @param  {boolean} [options.alwaysMerge=false] Always merge the new state into the old.
 * @param  {boolean} [options.alwaysUpdate=false] Always trigger an update even if state matches.
 * @param  {boolean|((a: any, b: any) => boolean)} [options.comparison=false] } When alwaysUpdate
 * is false, the comparison function provided will evaluate if the new state differs from the
 * old state. Pass true to perform a deep equal, otherwise the comparison will be shallow.
 * @param  {boolean} [options.alwaysImmediate=false] Update the state store instantly when the
 * setter function is called, as opposed to waiting for a refresh.
 * @param  {boolean} [options.alwaysDefer=false] All updates are deferred to the next event loop,
 * allowing updates during the render. Strongly recommended that this is used in conjunction
 * with `alwaysUpdate=false`
 * @returns {import('./types').StateHookInterface<S>} A three item
 * array containing: state, setState, getState
 */
export default function useDerivedState (
  fn,
  dependencies = [ fn ],
  { comparator = shallowEqual, ...ops } = {}
) {
  /* eslint-disable no-param-reassign */
  if (comparator === true) comparator = deepEqual;
  comparator = typeof comparator === 'function' ? comparator : shallowEqual;

  if (!isFunction(fn)) {
    throw new TypeError('useDerivedState did not receive a function for first argument.');
  }

  const initial = useStableMemo(fn, dependencies);

  const [ state, writeState, readState ] = useGettableState(initial, ops);
  useStableMemo(() => {
    // @ts-ignore
    const same = (state === initial) || comparator(state, initial);
    if (!same) {
      writeState(initial, { immediate: true, defer: true });
    }
  }, [ initial, ...dependencies ]);

  return [ readState(), writeState, readState ];
}
