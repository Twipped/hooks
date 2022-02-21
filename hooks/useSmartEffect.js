
import { useEffect, useRef } from 'react';
import { shallowEqual, deepEqual } from '@twipped/utils';
import dft from './default';

/**
 * Identical to useEffect, except dependencies may be compared deeply.
 *
 * @param  {Function} effect        The function to execute after render.
 * @param  {object}   dependencies  An object or array of values to compare for changes.
 * @param  {object}   options
 * @param  {boolean}  options.comparison The comparison function used to detect if
 * the dependencies change. Defaults to a shallow equal, pass true to use deep equality.
 * @returns {void}
 */
export default function useSmartEffect (effect, dependencies, { comparison = false } = {}) {
  if (comparison === false) comparison = shallowEqual;
  if (comparison === true) comparison = deepEqual;

  const depsRef = useRef(dft);
  const exitFn = useRef();

  useEffect(() => {
    if (depsRef.current === dft || !comparison(depsRef.current, dependencies)) {
      // update dependencies to newest value
      depsRef.current = dependencies;

      // run exit function from last evocation
      if (exitFn.current) exitFn.current();

      // run the effect, saving the exit function
      exitFn.current = effect();
    }
  });

  // when the component unmounts, run the last exitFn
  useEffect(() => () => exitFn.current && exitFn.current(), []);
}
