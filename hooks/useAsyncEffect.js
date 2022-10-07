import { useState, useEffect, useRef } from 'react';

import noop from '@twipped/utils/noop';
import DEFAULT from '@twipped/utils/default';
import warn from '@twipped/utils/warn';
import shallowEqual from '@twipped/utils/shallowEqual';
import deepEqual from '@twipped/utils/deepEqual';

/**
 * Executes an async function and sends rejections to the console.
 *
 * @param   {Function} fn
 * @param   {Function} onError
 *
 * @private
 * @returns {void}
 */
function asyncInterrupt (fn, onError = warn) {
  if (!fn) return undefined;
  try {
    const res = fn();
    if (res && typeof res.then === 'function') {
      res.then(noop, (e) => onError(e));
    }
  } catch (e) {
    onError(e);
  }
  return undefined;
}

/**
 * Identical to useEffect, except the effect can be an async function, the returned
 * disposer may be async, and it supports deep dependency comparison.
 *
 * @function useSmartEffect
 * @param  {Function} effect        The function to execute after render.
 * @param  {Object}   dependencies  An object or array of values to compare for changes.
 * @param  {Object}   options
 * @param  {Function|boolean}  options.comparison The comparison function used to detect if
 * the dependencies change. Defaults to a shallow equal, pass true to use deep equality.
 * @returns {void}
 */
export default function useAsyncEffect (effect, dependencies, { comparison = false } = {}) {
  /* eslint-disable no-param-reassign */
  if (!comparison) comparison = shallowEqual;
  if (comparison === true) comparison = deepEqual;
  /* eslint-enable no-param-reassign */

  const [ error, setError ] = useState(null);
  if (error) throw error;

  const depsRef = useRef(DEFAULT);
  const exitFn = useRef();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => asyncInterrupt(async () => {
    if (depsRef.current === DEFAULT || !comparison(depsRef.current, dependencies)) {
      // update dependencies to newest value
      depsRef.current = dependencies;

      // run exit function from last evocation
      asyncInterrupt(exitFn.current, setError);

      // run the effect, saving the exit function
      exitFn.current = await effect();
    }
  }, setError));

  // when the component unmounts, run the last exitFn
  useEffect(() => () => {
    asyncInterrupt(exitFn.current);
  }, []);
}
