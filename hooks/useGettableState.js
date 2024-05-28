/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
import { useState, useMemo, useRef } from 'react';
import { isObject } from '@twipped/utils/types';
import shallowEqual from '@twipped/utils/shallowEqual';
import deepEqual from '@twipped/utils/deepEqual';

/** @typedef {import('./types').StateHookInterface} StateHookInterface */

/**
 * Functions identical to useState, except the state is retrievable
 * via a callback passed as the third return element. This always returns
 * the current state regardless of where we are in the render process.
 *
 * @template S
 * @function useGettableState
 * @param  {S}       initial                  Default value passed to useState
 * @param  {object}  [options] Options
 * @param  {boolean} [options.alwaysMerge=false] Always merge the new state into the old.
 * @param  {boolean} [options.alwaysUpdate=true] Always trigger an update even if state matches.
 * Passing false to this option will cause it to only update if state actually changes.
 * @param  {boolean|Function} [options.comparison=false] } When alwaysUpdate is false,
 * the comparison function provided will evaluate if the new state differs from the old state.
 * Pass true to perform a deep equal, otherwise the comparison will be shallow.
 * @param  {boolean} [options.alwaysImmediate=false] Update the state store instantly when the
 * setter function is called, as opposed to waiting for a refresh.
 * @param  {boolean} [options.alwaysDefer=false] All updates are deferred to the next event loop,
 * allowing updates during the render. Strongly recommended that this is used in conjunction
 * with `alwaysUpdate=false`
 * @returns {import('./types').StateHookInterface<S>} A three item
 * array containing: state, setState, getState
 */
export default function useGettableState (
  initial,
  {
    alwaysImmediate = false,
    alwaysMerge = false,
    alwaysUpdate = true,
    alwaysDefer = false,
    comparison = false,
  } = {}
) {
  if (!comparison) comparison = shallowEqual;
  if (comparison === true) comparison = deepEqual;
  if (!(typeof comparison === 'function')) alwaysUpdate = true;

  const initialRef = useRef(initial);
  initialRef.current = initial;

  const [ state, setState ] = useState(initial);
  const ref = useRef(state);
  ref.current = state;

  const { getter, setter } = useMemo(() => {
    /**
     * Gets the state value
     *
     * @template T
     * @type {import('./types').Retrieve}
     */
    function getter () {
      return ref.current;
    }

    /**
     * Sets state
     *
     * @template T
     * @type {import('./types').DispatchFn}
     */
    function setter (value, {
      merge = alwaysMerge,
      forceUpdate = alwaysUpdate,
      immediate = alwaysImmediate,
      defer = immediate || alwaysDefer,
    } = {}) {
      if (!forceUpdate && typeof comparison === 'function' && comparison(value, ref.current)) return;

      let newState = value;
      // if passed a callback, invoke it with the current state and proceed with the return
      if (typeof value === 'function') {
        newState = value(ref.current);
      }

      // if merge is enabled and both states are objects,
      // merge the new state with the previous state
      if (merge && isObject(value) && isObject(ref.current)) {
        newState = { ...ref.current, ...newState };
      }

      // if this is an immediate update, change the ref right now
      // otherwise it will change next render after setState
      if (immediate) {
        ref.current = newState;
      }

      if (defer) {
        setTimeout(() => setState(newState));
      } else {
        setState(newState);
      }
    }
    setter.reset = (options) => {
      const init = initialRef.current;
      setter(init, options);
    };

    return { getter, setter };
  }, [
    alwaysMerge,
    alwaysUpdate,
    alwaysImmediate,
    alwaysDefer,
    comparison,
  ]);

  return [ ref.current, setter, getter ];
}
