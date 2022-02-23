
import { useRef, Children } from 'react';
import areHookInputsEqual from './areHookInputsEqual';

/**
 * Recursively iterates over the child structure, one child at a time.
 *
 * @param {Children} children The react `children` property
 * @yields {any} The current child
 * @private
 */
export function* childDescender (children) {
  for (const child of Children.toArray(children)) {
    if (child.props && child.props.children) {
      yield* childDescender(child.props.children);
      continue;
    }
    yield child;
  }
}

/**
 * Flattens a component tree into a single array of all child components.
 *
 * @param {Children} children The react `children` property
 * @returns {Array} A flattened array of child components
 * @private
 */
function flattenChildren (children) {
  return Array.from(childDescender(children),
    ({
      key,
      ref,
      type,
      props: {
        children, // eslint-disable-line
        ...props
      },
    }) => ({
      key, ref, type, props,
    }),
  ).flat(1);
}

/**
 * Works much like useMemo, except based upon the component child structure.
 * Memoizes deeply against all descendant properties.
 *
 * @function useChildren
 * @param  {Children} children The react `children` property
 * @param  {Function} factory The function to evaluate at mount and whenever children changes.
 * @returns {any} The last return value of the factory.
 */
export default function useChildren (children, factory) {
  let isValid = true;

  const deps = flattenChildren(children);

  const valueRef = useRef();

  if (valueRef.current) {
    isValid = !!(
      deps &&
      valueRef.current.deps &&
      areHookInputsEqual(deps, valueRef.current.deps)
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
