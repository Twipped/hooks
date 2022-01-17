
import { useCallback, useRef, useEffect } from 'react';
import useGettableState from './useGettableState';
import { shallowEqual, warn, MultiMap } from '@twipped/utils';
import useComputedRef from './useLazyRef';
import DEFAULT from './default';

/**
 * Creates a state hook populated by a value produced by a promise returning function.
 * If the dependencies change, the function will be re-run, and IF the results differ then the state will be updated.
 * Invoking setState.reset() will re-evaluate the function and force update with the results.
 * Note: State will always be empty at initial invocation until the promise resolves.
 * @param  {Function}     fn         Handler to run at initialization and when a dependency changes
 * @param  {Array<mixed>} deps       A dependency array
 * @param  {Function}     comparator A function to evaluate if the result of the handler differs from current state
 * @return {Object} Returns an object containing the current `state`, `get`, `set`, and `reset` functions, and the current `loading` state.
 */

export default function usePromisedState (fn, deps = [], { comparator = shallowEqual, skipFirst, initial = DEFAULT } = {}) {

  const [ state, writeState, readState ] = useGettableState(initial);
  const { current: flights } = useComputedRef(() => new Set());
  const { current: cache } = useComputedRef(() => new MultiMap());
  const isFirst = useRef(true);
  const ticker = useRef(0);

  const refresh = useCallback((force) => {

    var flight = deps && cache.get(deps);

    if (!flight || force) {
      // this request hasn't been seen before, so initiate and cache it.
      flight = (async () => fn())();

      if (deps) {
        // if we received a dependency array, we need to cache the request.
        // if the request fails, remove it from the cache.
        flight = flight.catch((err) => {
          warn('usePromiseState received a rejection: ', err);
          cache.delete(deps);
        });
        cache.set(deps, flight);
      }
    }

    // request is taking off, mark it as in-progress.
    const id = ++ticker.current;
    flights.add(id);
    flight = flight.then((res) => {
      flights.delete(id);

      // there's more recent refreshes currently in flight
      if (flights.size && ticker.current > id) return;

      if (force || !comparator(res, readState())) {
        writeState(res);
      }

      return res;
    });

    return flight;
  });

  useEffect(async () => {
    if (isFirst.current) {
      isFirst.current = false;
      if (skipFirst) return;
    }
    refresh();
  }, deps);

  const reset = useCallback(() => refresh(true), [ refresh ]);

  return {
    state: state === DEFAULT ? undefined : state,
    set: writeState,
    get: readState,
    reset,
    loading: state === DEFAULT || !!flights.size,
  };
}
