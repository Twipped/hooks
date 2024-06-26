import {
  useCallback,
  useRef,
} from 'react';
import useWhenElementRefReady from './useWhenElementRefReady.js';

const NEXT_STATE_STOP = 0;
const NEXT_STATE_CONTINUE = 1;
export const DEFAULT_DURATION = 480;

/**
 * acceleration until halfway, then deceleration
 *
 * @param {number} t
 * @returns {number}
 */
const easeInOutQuad = (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t); // eslint-disable-line no-mixed-operators

// locally override the globals so that if they don't exist (such as in tests or in SSR)
// we gracefully fallback to setTimeout.
const requestAnimationFrame = (
  typeof window !== 'undefined' && typeof window.requestAnimationFrame !== 'undefined'
) ? window.requestAnimationFrame : setTimeout;

const cancelAnimationFrame = (
  typeof window !== 'undefined' && typeof window.cancelAnimationFrame !== 'undefined'
) ? window.cancelAnimationFrame : clearTimeout;

/**
 * Tweening Loop
 *
 * @param {() => NEXT_STATE_STOP | NEXT_STATE_CONTINUE} next
 */
function animationLoop (next) {
  let i = 0;
  const loop = () => {
    if (next() === NEXT_STATE_STOP) {
      cancelAnimationFrame(i);
    } else {
      i = requestAnimationFrame(loop);
    }
  };
  i = requestAnimationFrame(loop);
}

/**
 * @callback easing
 * @param {number} x
 * @returns {number}
 */

/**
 * Tweener
 *
 * @internal
 * @param {(a: number) => void} callback
 * @param {{ duration: number, delay: number, easing: easing }} opts
 */
function animate (callback, opts) {
  const start = Date.now();
  const { duration, delay, easing } = opts;
  animationLoop(() => {
    const now = Date.now();
    const passed = now - (start + delay);
    const progress = Math.max(0, Math.min(1, passed / duration));
    callback(easing(progress));
    if (passed >= duration) {
      return NEXT_STATE_STOP;
    }
    return NEXT_STATE_CONTINUE;
  });
}

/**
 * Lifts
 *
 * @param {any|((x:any) => any)} value
 * @returns {(x:any) => any}
 */
function lift (value) {
  return (x) => (typeof value === 'function' ? value(x) : value);
}

/**
 * Provides a mechanism to smoothly scroll to the target element.
 *
 * @function useScrollToElement
 * @param {object} [options]
 * @param {import('react').MutableRefObject<HTMLElement>|HTMLElement} [options.auto]
 * If given an element or ref, will automatically scroll to that element the moment
 * it becomes available.
 * @param {number} [options.delay] Milliseconds to pause until starting to scroll
 * @param {number} [options.duration] Duration of the scroll animation, in milliseconds
 * @param {easing} [options.easing] Easing function for the animation.
 * Defaults to ease-in-out-quad https://easings.net/#easeInOutQuad
 * @param {number|((delta: -1|1) => number)} [options.offsetLeft] Offset delta from the left edge
 * of the component, in pixels. May also be a function that is invoked at start of scroll,
 * receiving 1 or -1 to indicate scroll direction.
 * @param {number|((delta: -1|1) => number)} [options.offsetTop] Offset delta from the top edge
 * of the component, in pixels. May also be a function that is invoked at start of scroll,
 * receiving 1 or -1 to indicate scroll direction.
 * @param {Function} [options.onEnter]
 * @param {Function} [options.onEntered]
 * @param {Function} [options.onEntering]
 * @param {Function} [options.onExiting]
 * @param {Function} [options.onExit]
 * @param {Function} [options.onExited]
 * @returns {(target: HTMLElement) => void} Returns a callback that receives a target element.
 */
export default function useScrollToElement ({ auto, ...options } = {}) {
  const optionsRef = useRef(options);
  // ensure always current for last update
  optionsRef.current = options;

  const scroll = useCallback(function scrollTo (/** @type {HTMLElement} */ element) {
    if (!element) {
      return;
    }

    requestAnimationFrame(() => {
      const {
        delay = 0,
        duration = DEFAULT_DURATION,
        easing = easeInOutQuad,
        offsetLeft = 0,
        offsetTop = 0,
        onEnter,
        onEntering,
      } = optionsRef.current;

      const { top, left } = element.getBoundingClientRect();
      const startTop = window?.scrollY ?? 0;
      const startLeft = window?.scrollX ?? 0;
      const targetTop = top - lift(offsetTop)(top > 0 ? 1 : -1);
      const targetLeft = left - lift(offsetLeft)(left > 0 ? 1 : -1);

      if (onEnter) onEnter();
      if (onEntering) onEntering();

      if (typeof duration !== 'number' || duration <= 0) {
        const {
          onEntered,
          onExiting,
          onExit,
          onExited,
        } = optionsRef.current;

        if (onEntered) onEntered();
        window?.scrollTo({
          top: startTop + targetTop,
          left: startLeft + targetLeft,
          behavior: 'auto',
        });
        if (onExiting) onExiting();
        if (onExit) onExit();
        if (onExited) onExited();
        return;
      }

      let entered = false;
      animate((/** @type {number} */ progress) => {
        const {
          onEntered,
          onExiting,
          onExit,
          onExited,
        } = optionsRef.current;

        if (progress === 0 && onEntering) onEntering();
        if (progress > 0 && !entered) {
          entered = true;
          if (onEntered) onEntered();
        }
        window?.scrollTo({
          top: startTop + (progress * targetTop),
          left: startLeft + (progress * targetLeft),
          behavior: 'auto',
        });
        if (progress === 1) {
          if (onExiting) onExiting();
          if (onExit) onExit();
          if (onExited) onExited();
        }
      }, { duration, delay, easing });
    });
  }, []);

  useWhenElementRefReady(auto, scroll);

  return scroll;
}
