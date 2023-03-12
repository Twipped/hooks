import { useState, useRef } from 'react';
import useIsomorphicEffect from './useIsomorphicEffect.js';
import useEventCallback from './useEventCallback.js';
import resolveRef from './resolveRef.js';
/** @typedef {import('@types/react').Ref} Ref */

/**
 * Executes the passed function once the provided Ref resolves to a value.
 *
 * @function useWhenElementRefReady
 * @param {Ref|HTMLElement} ref Ref
 * @param {Function} [onResolved] Callback to invoke with the ref resolves
 * @returns {any}
 */
export default function useWhenElementRefReady (ref, onResolved) {
  const [ resolvedRef, setRef ] = useState(() => resolveRef(ref));
  const cleanupRef = useRef();
  onResolved = useEventCallback(onResolved);

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
