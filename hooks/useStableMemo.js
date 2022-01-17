
import { useRef } from 'react';
import areHookInputsEqual from './areHookInputsEqual';
import { shallowEqual, deepEqual } from '@twipped/utils';

/**
 * Identical to `useMemo` _except_ that it provides a semantic guarantee that
 * values will not be invalidated unless the dependencies change. This is unlike
 * the built in `useMemo` which may discard memoized values for performance reasons.
 *
 * @param factory A function that returns a value to be memoized
 * @param deps A dependency array
 */
export default function useStableMemo (factory, deps, comparison = areHookInputsEqual) {
  if (comparison === false) comparison = shallowEqual;
  if (comparison === true) comparison = deepEqual;

  let isValid = true;

  const valueRef = useRef();

  if (valueRef.current) {
    isValid = !deps || !!(
      deps &&
      valueRef.current.deps &&
      comparison(deps, valueRef.current.deps)
    );
  } else {
    valueRef.current = {
      deps,
      result: factory(),
    };
  }

  const cache = isValid ? valueRef.current : { deps, result: factory() };
  // must update immediately so any sync renders here don't cause an infinite loop
  valueRef.current = cache;

  return cache.result;
}
