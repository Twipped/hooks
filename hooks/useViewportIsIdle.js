// eslint-disable-next-line import/extensions

import {
  useEffect, useRef,
} from 'react';
import useGettableState from './useGettableState.js';
import useEventCallback from './useEventCallback.js';
import { isWholeNumber } from './asserts.js';
import useInterval from './useInterval.js';

function throttle (func, timeFrame) {
  var lastTime = 0;
  return function (...args) {
    var now = Date.now();
    if (now - lastTime >= timeFrame) {
      func(...args);
      lastTime = now;
    }
  };
}

/**
 * Hook which tracks user interaction with the current viewport/page
 * and toggles a boolean if the user has not interacted in N number of
 * seconds.
 *
 * @param {number} seconds
 * @param {(idle: Date|false) => void} onChange
 * @returns {Date|false}
 */
export default function useViewportIsIdle (seconds, onChange = null) {
  if (!isWholeNumber(seconds)) {
    throw new Error('useViewportIsIdle requires a whole number for seconds.');
  }

  const [ idle, setIdle, getIdle ] = useGettableState(false);
  const lastSeen = useRef(Date.now());

  // storing this in a ref so the callback can access it without
  // a changing dependency.
  const deltaRef = useRef(seconds * 1000);
  deltaRef.current = seconds * 1000;

  const memoizedOnChange = useEventCallback(onChange);

  const checkIdle = useEventCallback(() => {
    const state = (Date.now() - lastSeen.current) >= deltaRef.current;
    if (state !== getIdle()) {
      setIdle(state);
      memoizedOnChange(state ? new Date(lastSeen.current) : false);
    }
  });
  const interval = useInterval(checkIdle, 1000);

  useEffect(() => {
    interval.start();
    const onEvent = throttle(() => {
      lastSeen.current = Date.now();
      checkIdle();
    }, 1000);

    const onVisibilityChange = () => {
      if (!document.hidden) {
        onEvent();
      }
    };

    window.addEventListener('mousemove', onEvent);
    window.addEventListener('mousedown', onEvent);
    window.addEventListener('resize', onEvent);
    window.addEventListener('keydown', onEvent);
    window.addEventListener('touchstart', onEvent);
    window.addEventListener('wheel', onEvent);
    document.addEventListener('visibilitychange', onVisibilityChange);

    // checkIdle();

    return () => {
      window.removeEventListener('mousemove', onEvent);
      window.removeEventListener('mousedown', onEvent);
      window.removeEventListener('resize', onEvent);
      window.removeEventListener('keydown', onEvent);
      window.removeEventListener('touchstart', onEvent);
      window.removeEventListener('wheel', onEvent);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, [ checkIdle, interval ]);

  return idle ? new Date(lastSeen.current) : false;
}
