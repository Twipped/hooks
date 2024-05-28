import { useCallback, useState } from 'react';
import { isPromise } from '@twipped/utils/types';

/**
 * Identical to React.useCallback, except if the callback produces a promise,
 * we dispose of any resolved value and forward rejections to the console.
 *
 * @function useAsyncCallback
 * @template {Function} T
 * @param  {T} callback Callback function
 * @param  {Array<any>}    dependencies Dependencies array
 * @returns {T}
 * @example ```jsx
 * import { useState } from 'react';
 * import useAsyncCallback from '@zenbusiness/application-commons-hooks/useAsyncCallback';
 * import { fetchCompletions } from './fetchRequests.js';
 * const [completions, setCompletions] = useState([]);
 * const onKeyPress = useAsyncFunction(async (ev) => {
 *   const { value } = ev.target;
 *   const comps = await fetchCompletions(value);
 *   setCompletions(comps);
 * });
 * return (
 *   <datalist onKeyPress={onKeyPress}>
 *     {completions.map((c) => <option value={c} />}
 *   </datalist>
 * );
 * ```
 */
export default function useAsyncCallback (callback, dependencies) {
  const [ error, setError ] = useState(null);
  if (error) throw error;
  // @ts-ignore
  return useCallback((...args) => {
    try {
      const ret = callback(...args);
      if (isPromise(ret)) {
        ret.then(null, (err) => {
          setError(err);
        });
      }
    } catch (err) {
      setError(err);
    }
  }, dependencies); // eslint-disable-line react-hooks/exhaustive-deps
}
