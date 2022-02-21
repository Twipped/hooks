
import { useCallback } from 'react';
import { action } from 'mobx';

/**
 * Shortcut callback wrapper for MobX actions
 *
 * @name useAction
 * @param  {Function} fn            Callback function to wrap
 * @param  {Array<*>} dependencies  Array of hook dependencies passed to useCallback
 * @returns {void}
 */
export default function useAction (fn, dependencies) {
  return useCallback(action(fn), dependencies);
}
