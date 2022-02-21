
import { useState } from 'react';
import useEventHandler from './useEventHandler';
import useWhenElementRefReady from './useWhenElementRefReady';

/**
 * @typedef {object} Ref
 * @property {*} current The contents of the ref
 */

/**
 * @param {Element} parent
 * @param {Element} target
 * @param {string} [selector]
 * @returns {boolean}
 * @private
 */
function matches (parent, target, selector) {
  if (!selector) return parent === target;
  const nodes = Array.from(parent.querySelectorAll(selector));
  return nodes.includes(target);
}

/**
 * Returns true if the target element is currently animating a css transition
 *
 * @name useIsTransitioning
 * @param  {Ref<Element>} elementRef
 * @param  {string} [selector]   Optional css selector to specify the animation delegate
 * @returns {boolean}
 */
export default function useIsTransitioning (elementRef, selector = null) {
  const [ isTransitioning, setTransition ] = useState(0);

  const run = useEventHandler('transitionrun', (ev) => {
    if (!matches(ev.currentTarget, ev.target, selector)) return;
    setTransition(1);
  });

  const start = useEventHandler('transitionstart', (ev) => {
    if (!matches(ev.currentTarget, ev.target, selector)) return;
    setTransition(1);
  });

  const cancel = useEventHandler('transitioncancel', (ev) => {
    if (!matches(ev.currentTarget, ev.target, selector)) return;
    setTransition(0);
  });

  const end = useEventHandler('transitionend', (ev) => {
    if (!matches(ev.currentTarget, ev.target, selector)) return;
    setTransition(0);
  });

  useWhenElementRefReady(elementRef, () => {
    run.attach(elementRef);
    start.attach(elementRef);
    cancel.attach(elementRef);
    end.attach(elementRef);
  });

  return isTransitioning;
}
