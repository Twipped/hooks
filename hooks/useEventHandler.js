
import { useMemo, useRef } from 'react';
import useWillUnmount from './useWillUnmount.js';
import useEventCallback from './useEventCallback.js';
import useWhenElementRefReady from './useWhenElementRefReady.js';

/**
 * @typedef {Object} EventHandlerInterface
 */

/**
 * @function EventHandlerInterface#attach
 * @description Attaches the handler to the provided target.
 * @memberof EventHandlerInterface
 * @param {Element} target
 */

/**
 * @function EventHandlerInterface#remove
 * @description Detaches the handler from its target.
 * @memberof EventHandlerInterface
 */

/**
 * Attaches an event handler to a specified DOM element, bypassing the react synthetic event system.
 * Handler is automatically cleaned up when the calling component unmounts.
 *
 * @function useEventHandler
 * @param {string}   event    Name of the DOM event to listen for.
 * @param {Function} listener An event handler
 * @param {boolean}  capture  Whether or not to listen during the capture event phase
 * @returns {EventHandlerInterface} The attachment interface
 */
export default function useEventHandler (event, listener, capture = false) {
  const handler = useEventCallback(listener);
  const targetRef = useRef(null);

  const api = useMemo(() => ({
    remove () {
      if (!targetRef.current) return;
      const { target, event: _event, capture: _capture } = targetRef.current;
      target.removeEventListener(_event, handler, _capture);
      targetRef.current = null;
    },

    attach (target) {
      if (targetRef.current) api.remove();

      // if we received a proper Ref object, destructure it.
      if ('current' in target) target = target.current;
      if (typeof target === 'function') throw new TypeError('useEventHandler cannot take refs as functions.');
      if (typeof target.addEventListener !== 'function') throw new TypeError('Did not receive a valid DOM element.');

      targetRef.current = { target, event, capture };
      target.addEventListener(event, handler, capture);
    },
  }), [ capture, event, handler ]);

  useWillUnmount(api.remove);

  return api;
}

/**
 * Functions identical to useEventHandler, but takes a React Ref object as its first argument
 *
 * @function useEventHandlerOn
 * @param  {Ref} ref            Target ref to attach to, when ready.
 * @param  {string} event       Name of the DOM event to listen for.
 * @param  {Function} listener  An event handler
 * @param  {boolean} capture    Whether or not to listen during the capture event phase
 * @returns {void}
 */
export function useEventHandlerOn (ref, event, listener, capture = false) {
  if (!('current' in ref)) throw new TypeError('Did not receive a valid ref.');

  const { attach, remove } = useEventHandler(event, listener, capture);

  useWhenElementRefReady(ref, (el) => {
    if (el instanceof Element) {
      attach(el);
      return remove;
    }
    return null;
  });
}
