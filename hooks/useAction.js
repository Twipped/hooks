
import { useCallback } from 'react';
import { action } from 'mobx';

/**
 * Shortcut callback wrapper for MobX actions
 *
 * @function useAction
 * @param  {Function} fn            Callback function to wrap
 * @param  {Array} dependencies  Array of hook dependencies passed to useCallback
 * @returns {void}
 */
export default function useAction (fn, dependencies) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useCallback(action(fn), dependencies);
}
