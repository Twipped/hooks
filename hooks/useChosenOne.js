
import { useState, useEffect } from 'react';

/**
 * ChosenOne state manager
 *
 * @private
 */
class ChosenOneManager {

  constructor () {
    this.hooks = [];
  }

  get active () {
    return !!this.hooks.length;
  }

  get first () {
    return this.hooks[0];
  }

  get last () {
    return this.hooks[this.hooks.length - 1];
  }

  isFirst (ref) {
    return ref === this.first;
  }

  isLast (ref) {
    return ref === this.last;
  }

  push (ref) {
    const prevLast = this.last;
    this.hooks.push(ref);
    invokeState(prevLast, [ this.hooks.length === 2, false ]);
    return [ !prevLast, true ];
  }

  unshift (ref) {
    const prevFirst = this.last;
    this.hooks.push(ref);
    invokeState(prevFirst, [ false, this.hooks.length === 2 ]);
    return [ true, !prevFirst ];
  }

  pop () {
    const ref = this.hooks.pop();
    const last = this.last;
    if (!last) return undefined;
    // if there's only one ref, then it's the first.
    invokeState(last, [ this.hooks.length === 1, true ]);
    return ref;
  }

  shift () {
    const ref = this.hooks.shift();
    const first = this.first;
    if (!first) return undefined;
    invokeState(first, [ true, this.hooks.length === 1 ]);
    return ref;
  }

  cut (idx) {
    return this.hooks.splice(idx, 1);
  }

  remove (ref) {
    if (ref === this.last) {
      return this.pop();
    }

    if (ref === this.first) {
      return this.shift();
    }

    const idx = this.hooks.indexOf(ref);
    if (idx < 0) return undefined;
    return this.cut();
  }

}

const Managers = new Map;

/**
 * @typedef ChosenStatus
 * @property {boolean} first Is the first instance of the component
 * @property {boolean} last Is the last instance of the component
 */

/**
 * Tracks component instantiation and reports if the current component is the
 * first and/or last instance of the component. Useful for fullscreen effects such
 * as backdrops where you do not want multiple instances.
 *
 * @function useChosenOne
 * @param  {string | symbol} channel The name/category of the component to be tracked.
 * @returns {ChosenStatus}
 */
export default function useChosenOne (channel) {
  if (!Managers.has(channel)) Managers.set(channel, new ChosenOneManager);
  const manager = Managers.get(channel);

  const [ [ first, last ], setState ] = useState([ false, false ]);

  useEffect(() => {
    setState(manager.push(setState));
    return () => manager.remove(setState);
  }, [ manager ]);

  return { first, last };
}

/**
 * Invokes a state setter outside of the current execution stack.
 *
 * @param  {Function} fn    Setter function
 * @param  {any}        state The state to set
 * @returns {void}
 * @private
 */
function invokeState (fn, state) {
  if (!fn) return;
  setTimeout(() => fn(state));
}
