
import { isObject, isArray } from '@twipped/utils';
import useStableMemo from './useStableMemo.js';

/**
 * Memoizes a passed object so that the same object is always returned
 * as long as all of its properties are unchanged. This is useful for
 * objects passed as component props, so that child components will not re-render
 * because a parent component rendered and produced a new object. Most
 * notably, this is needed to prevent context providers from triggering
 * downstream updates every time they render.
 *
 * @function useMemoObject
 * @param {object}    obj The object to memoize.
 * @param {object}    options
 * @param {boolean}   options.comparison The comparison function used to detect if
 * the object properties change. Defaults to a shallow equal, pass true to use deep equality.
 * @returns {object} The first instance of the object passed.
 */
export default function useMemoObject (obj, options) {
  if (!isArray(obj) && !isObject(obj)) return obj;
  return useStableMemo(() => obj, isArray(obj) ? obj : Object.values(obj), options);
}
