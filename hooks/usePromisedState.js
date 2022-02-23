
import { useState, useCallback, useRef, useEffect } from 'react';
import useGettableState from './useGettableState';
import { shallowEqual, warn, MultiMap } from '@twipped/utils';
import useLazyRef from './useLazyRef';
import DEFAULT from './default';

/**
 * @typedef PromisedState
 * @description Promised State API interface
 * @memberof usePromisedState
 */

/**
 * @property {boolean} PromisedState#state
 * @memberof PromisedState
 * @readonly
 * @description The current state
 */

/**
 * @property {boolean} PromisedState#loading
 * @memberof PromisedState
 * @readonly
 * @description Is the promise unresolved.
 */

/**
 * @property {boolean} PromisedState#error
 * @memberof PromisedState
 * @readonly
 * @description If the promise rejects or the factory throws, this will have the error.
 */

/**
 * @function PromisedState#get
 * @memberof PromisedState
 * @returns {any} The most recent result of the promise
 */

/**
 * @function PromisedState#set
 * @memberof PromisedState
 * @param {any} value Overwrites the state
 * @returns {void}
 */

/**
 * @function PromisedState#reset
 * @memberof PromisedState
 * @returns {void}
 * @description Clears the state and reruns the promise factory.
 */


/**
 * Creates a state hook populated by a value produced by a promise returning function.
 * If the dependencies change, the function will be re-run, and IF the results differ then the state will be updated.
 * Invoking setState.reset() will re-evaluate the function and force update with the results.
 * Note: State will always be empty at initial invocation until the promise resolves.
 *
 * @function usePromisedState
 * @param {Function} fn                 Handler to run at initialization and when a dependency changes
 * @param {Array}    dependencies       A dependency array
 * @param {object}   options
 * @param {Function} options.comparator A function to evaluate if the result of the handler differs from current state
 * @param {boolean}  options.skipFirst  Should the state me fetched on first render
 * @param {any}        options.initial    Default value of the state before first fetch.
 * @returns {PromisedState}
 */
export default function usePromisedState (fn, dependencies = [], { comparator = shallowEqual, skipFirst, initial = DEFAULT } = {}) {

  const [ error, setError ] = useState();
  const [ state, writeState, readState ] = useGettableState(initial);
  const { current: flights } = useLazyRef(() => new Set());
  const { current: cache } = useLazyRef(() => new MultiMap());
  const isFirst = useRef(true);
  const ticker  = useRef(0);

  const refresh = useCallback((force) => {

    var flight = dependencies && cache.get(dependencies);

    if (!flight || force) {
      // this request hasn't been seen before, so initiate and cache it.
      flight = (async () => fn())();

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
      if (flights.size && ticker.current > id) return;


      if (force || !comparator(res, readState())) {
        setError(null);
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
