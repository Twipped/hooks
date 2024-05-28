/* eslint-disable react-hooks/exhaustive-deps */
import {
  useCallback, useRef, useState,
} from 'react';
import useDebounce from './useDebounce.js';
import useMountEffect from './useMountEffect.js';

/**
 * Hook that generates an update callback that is guaranteed to never
 * cause a state change during render.
 *
 * @returns {() => void}
 */
export default function useDeferredUpdate () {
  const hasMountedRef = useRef(false);
  const requestedRef = useRef(false);
  const [ , setState ] = useState(1);
  const debouncedUpdate = useDebounce(() => {
    setState(Math.random());
  }, 10, 0);

  useMountEffect(() => {
    hasMountedRef.current = true;
    if (requestedRef.current) {
      debouncedUpdate();
    }
    return () => { hasMountedRef.current = false; };
  });

  const update = useCallback(() => {
    // do not update if we haven't mounted yet
    if (hasMountedRef.current) {
      debouncedUpdate();
      return;
    }

    // update request occurred before mount, queue for after mount
    requestedRef.current = true;
  }, []);

  return update;
}
