import delay from '@twipped/utils/delay';
import { useRef, useEffect } from 'react';

/** @typedef {(run?: boolean) => void} Disposer */
/** @typedef {() => void} Destructor */
/** @typedef {import('./types').EffectCallback} EffectCallback */

/**
 * Performs the given effect only after true mount, accounting for StrictMode.
 * If the effect returns a destructor callback, it will be invoked on
 * component dismount.
 *
 * @function useMountEffect
 * @param  {EffectCallback} effect Callback to invoke on mount
 * @returns {boolean} Returns whether the component is actually mounted
 */
export default function useMountEffect (effect) {
  /** @type {import('react').MutableRefObject<boolean>} */
  const hasActuallyMounted = useRef(false);

  /** @type {import('react').MutableRefObject<void|Disposer>} */
  const dRef = useRef();

  /** @type {import('react').MutableRefObject<void|Destructor>} */
  const tearDown = useRef();

  useEffect(() => {
    dRef.current = /** @type {Disposer} */ (delay(() => {
      hasActuallyMounted.current = true;
      tearDown.current = effect?.();
    }, 1));
    return dRef.current;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => () => {
    if (!hasActuallyMounted.current) return;
    // @ts-ignore
    tearDown.current?.();
  }, []);

  return hasActuallyMounted.current;
}
