import { useState, useRef } from 'react';
import useIsomorphicEffect from './useIsomorphicEffect.js';
import useEventCallback from './useEventCallback.js';
import resolveRef from './resolveRef.js';

/**
 * Executes the passed function once the provided Ref resolves to a value.
 *
 * @function useWhenElementRefReady
 * @template {HTMLElement} T
 * @param {import('react').MutableRefObject<T>|T} ref Ref
 * @param {(element: T) => void | import('./types.js').Destructor} [onResolved] Callback to invoke with the ref resolves
 * @returns {any}
 */
export default function useWhenElementRefReady (ref, onResolved) {
  const [ resolvedRef, setRef ] = useState(() => resolveRef(ref));
  /** @type {import('react').MutableRefObject<void | import('./types.js').Destructor>} */
  const cleanupRef = useRef();

  // eslint-disable-next-line no-param-reassign
  onResolved = useEventCallback(onResolved);
  // wrap the callback with an EC so we don't have to worry about it
  // changing between renders.

  useIsomorphicEffect(() => {
    if (!ref) return;
    const nextRef = resolveRef(ref);
    if (nextRef === resolvedRef) return;

    if (typeof cleanupRef.current === 'function') cleanupRef.current();
    if (onResolved) cleanupRef.current = onResolved(nextRef);
    setRef(nextRef);
  });

  return resolvedRef;
}
