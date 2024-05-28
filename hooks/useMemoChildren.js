import { flattenChildren } from './children.js';
import useStableMemo from './useStableMemo.js';

/**
 * Functionally identical to `useMemo`, except it takes a react `children` prop as
 * its dependencies, memozing the results of the factory function against the elements given.
 * @template {any} T
 * @param {() => T} factory
 * @param {import('./children').Children} children
 * @returns {T}
 */
export default function useMemoChildren (factory, children) {
  const deps = flattenChildren(children);
  return useStableMemo(factory, deps, { comparison: true });
}
