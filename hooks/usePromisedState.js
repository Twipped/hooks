
import { useState, useCallback, useRef } from 'react';
import deepEqual from '@twipped/utils/deepEqual';
import shallowEqual from '@twipped/utils/shallowEqual';
import warn from '@twipped/utils/warn';
import MultiMap from '@twipped/utils/multimap';
import DEFAULT from '@twipped/utils/default';
import useUpdatedRef from './useUpdatedRef.js';
import useGettableState from './useGettableState.js';
import useLazyRef from './useLazyRef.js';
import useAsyncEffect from './useAsyncEffect.js';

/**
 * @typedef {import('./types.js').PromisedState} PromisedState
 */

/** @typedef {import('./types.js').Comparison} Comparison */

/**
 * Creates a state hook populated by a value produced by a promise returning function.
 * If the dependencies change, the function will be re-run, and IF the results differ then the state will be updated.
 * Invoking setState.reset() will re-evaluate the function and force update with the results.
 * Note: State will always be empty at initial invocation until the promise resolves.
 *
 * @function usePromisedState
 * @param {Function}   fn                 Handler to run at initialization and when a dependency changes
 * @param {Array}      dependencies       A dependency array
 * @param {object}     [options]
 * @param {Comparison} [options.comparison] A function to evaluate if the result of the handler differs from current state
 * @param {boolean}    [options.skipFirst]  Should the state me fetched on first render
 * @param {any}        [options.initial]    Default value of the state before first fetch.
 * @returns {PromisedState}
 */
export default function usePromisedState (fn, dependencies = [],
  { comparison = false,
    skipFirst = false,
    initial = DEFAULT,
  } = {}
) {
  if (!comparison) comparison = shallowEqual;
  if (comparison === true) comparison = deepEqual;

  const fnRef = useUpdatedRef(fn);
  const dependenciesRef = useUpdatedRef(dependencies);
  const comparatorRef = useUpdatedRef(comparison);

  const [ error, setError ] = useState();
  const [ state, writeState, readState ] = useGettableState(initial);
  const { current: flights } = useLazyRef(() => new Set());
  const { current: cache } = useLazyRef(() => new MultiMap());
  const isFirst = useRef(true);
  const ticker = useRef(0);

  const refresh = useCallback((force) => {
    // eslint-disable-next-line no-shadow
    const dependencies = dependenciesRef.current;

    var flight = dependencies && cache.get(dependencies);

    if (!flight || force) {
      // this request hasn't been seen before, so initiate and cache it.
      flight = (async () => fnRef.current())();

      if (dependencies) {
        // if we received a dependency array, we need to cache the request.
        // if the request fails, remove it from the cache.
        flight = flight.catch((err) => {
          warn('usePromiseState received a rejection: ', err);
          setError(err);
          cache.delete(dependencies);
        });
        cache.set(dependencies, flight);
      }
    }

    // request is taking off, mark it as in-progress.
    const id = ++ticker.current;
    flights.add(id);
    flight = flight.then((res) => {
      flights.delete(id);

      // there's more recent refreshes currently in flight
      if (flights.size && ticker.current > id) return undefined;


      if (force || !comparatorRef.current(res, readState())) {
        setError(null);
        writeState(res);
      }

      return res;
    });

    return flight;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useAsyncEffect(async () => {
    if (isFirst.current) {
      isFirst.current = false;
      if (skipFirst) return;
    }
    refresh();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  const reset = useCallback(() => refresh(true), [ refresh ]);

  return {
    state: state === DEFAULT ? undefined : state,
    set: writeState,
    get: readState,
    reset,
    error,
    loading: state === DEFAULT || !!flights.size,
  };
}
