import useTimeoutGenerator from './useTimeoutGenerator.js';

/** @typedef {import('./types').TimeoutHandler} TimeoutHandler */

/**
 * Returns a controller object for setting a timeout that is properly cleaned up
 * once the component unmounts. New timeouts cancel and replace existing ones.
 *
 * @function useTimeout
 * @param {() => void} [fn] A base function for the timeout.
 * @returns {TimeoutHandler}
 * @example
 * const { set, clear } = useTimeout();
 * const [hello, showHello] = useState(false);
 *
 * //Display hello after 5 seconds
 * set(() => showHello(true), 5000);
 * return (
 *   <div className="App">
 *     {hello ? <h3>Hello</h3> : null}
 *   </div>
 * );
 */
export default function useTimeout (fn) {
  return useTimeoutGenerator(setTimeout, clearTimeout, fn);
}
