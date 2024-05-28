import useTimeoutGenerator from './useTimeoutGenerator.js';

const RAF = (typeof requestAnimationFrame !== 'undefined') ? requestAnimationFrame : setTimeout;
const CAF = (typeof cancelAnimationFrame !== 'undefined') ? cancelAnimationFrame : clearTimeout;
/**
 * Returns a controller object for performing a UI deferred task that is properly cleaned up
 * if the component unmounts before the task complete. New deferrals cancel and replace
 * existing ones.
 *
 * @function useDefer
 * @param {Function} [fn] A base function for the timeout.
 * @returns {import('./types').TimeoutHandler}
 */
export default function useDefer (fn) {
  return useTimeoutGenerator(RAF, CAF, fn);
}
