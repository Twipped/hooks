
import { useState, useMemo, useRef } from 'react';
import { isFunction, isObject, shallowEqual, deepEqual } from '@twipped/utils';

/**
 * Functions identical to useState, except the state is retrievable
 * via a callback passed as the third return element. This always returns
 * the current state regardless of where we are in the render process.
 *
 * @function useGettableState
 * @param  {any}       initial                  Default value passed to useState
 * @param  {object}  options
 * @param  {boolean} options.alwaysMerge      [description]
 * @param  {boolean} options.alwaysUpdate     [description]
 * @param  {boolean | Function} options.comparison } When alwaysUpdate is false, the comparison
 * function provided will evaluate if the new state differs from the old state. Pass true
 * to perform a deep equal, otherwise the comparison will be shallow.
 * @returns {StateHookInterface} A three item array containing: state, setState, getState
 */
export default function useGettableState (initial, { alwaysMerge = false, alwaysUpdate = true, comparison = false } = {}) {
  if (!comparison) comparison = shallowEqual;
  if (comparison === true)  comparison = deepEqual;
  if (!isFunction(comparison)) alwaysUpdate = true;

  const [ state, setState ] = useState(initial);
  const ref = useRef(state);
  ref.current = state;

  const { getter, setter } = useMemo(() => ({
    getter () {
      return ref.current;
    },

    setter (value, { merge = alwaysMerge, forceUpdate = alwaysUpdate } = {}) {
      if (merge && isObject(value, true)) {
        value = { ...ref.current, ...value };
      }
      if (!forceUpdate && comparison(value, ref.current)) return;
      ref.current = value;
      setState(value);
    },
  }));

  setter.reset = (options) => setter(isFunction(initial) ? initial() : initial, options);

  return [ state, setter, getter ];
}
