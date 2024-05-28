/* global ElementEventMap GlobalEventHandlersEventMap */
import { useEffect, useMemo, useRef } from 'react';
import useEventCallback from './useEventCallback.js';
import useWhenElementRefReady from './useWhenElementRefReady.js';

/**
 * Attaches the handler to the provided target
 *
 * @callback EventHandlerInterfaceAttach
 * @param {Element|import('react').MutableRefObject<Element>} target
 */

/**
 * Detaches the handler from its target.
 *
 * @callback EventHandlerInterfaceRemove
 */

/**
 * @typedef {{
 *  attach: EventHandlerInterfaceAttach,
 *  remove: EventHandlerInterfaceRemove
 * }} EventHandlerInterface
 */

/**
 * Attaches an event handler to a specified DOM element, bypassing the react synthetic event system.
 * Handler is automatically cleaned up when the calling component unmounts.
 *
 * @function useEventHandler
 * @param {keyof (ElementEventMap & GlobalEventHandlersEventMap)}   event    Name of the DOM event to listen for.
 * @param {Function} listener An event handler
 * @param {boolean}  [capture]  Whether or not to listen during the capture event phase
 * @returns {EventHandlerInterface} The attachment interface
 */
export default function useEventHandler (event, listener, capture = false) {
  const handler = /** @type {(this: Element, ev: Event) => any} */ (useEventCallback(listener));
  const targetRef = useRef(null);

  const api = useMemo(() => ({
    /**
     * Remove Element
     *
     * @type {EventHandlerInterfaceRemove}
     */
    remove () {
      if (!targetRef.current) return;
      const { target, event: _event, capture: _capture } = targetRef.current;
      target.removeEventListener(_event, handler, _capture);
      targetRef.current = null;
    },

    /**
     * Attach Element
     *
     * @type {EventHandlerInterfaceAttach}
     */
    attach (target) {
      api.remove();
      // if we received a proper Ref object, destructure it.
      // eslint-disable-next-line no-param-reassign
      if ('current' in target) target = target.current;
      if (typeof target === 'function') throw new TypeError('useEventHandler cannot take refs as functions.');
      if (typeof target.addEventListener !== 'function') throw new TypeError('Did not receive a valid DOM element.');

      targetRef.current = { target, event, capture };
      target.addEventListener(event, handler, capture);
    },
  }), [ capture, event, handler ]);

  useEffect(() => () => api.remove(), [ api ]);

  return api;
}

/**
 * Creates an event handler attached to the given element (or element containing ref)
 *
 * @function useEventHandlerOn
 * @param  {import('react').MutableRefObject<HTMLElement>} ref Target element to attach to,
 * when ready.
 * @param  {keyof ElementEventMap} event Name of the DOM event to listen for.
 * @param  {Function} listener  An event handler
 * @param  {boolean} [capture] Whether or not to listen during the capture event phase
 * @returns {void}
 */
export function useEventHandlerOn (ref, event, listener, capture = false) {
  if (!('current' in ref)) {
    throw new TypeError('Did not receive a valid ref or dom element');
  }

  const { attach, remove } = useEventHandler(event, listener, capture);

  useWhenElementRefReady(ref, (el) => {
    if (el instanceof Element) {
      attach(el);
      return remove;
    }
    return null;
  });
}
