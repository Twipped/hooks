
import { useEffect, useMemo, useRef, useCallback } from 'react';
import useEventCallback from './useEventCallback.js';
import resolveRef from './resolveRef.js';

/**
 * @typedef {Object} GlobalListenerInterface
 * @memberof useGlobalListener
 */

/**
 * @function GlobalListenerInterface#attach
 * @description Attaches the handler to its target.
 * @memberof GlobalListenerInterface
 */

/**
 * @function GlobalListenerInterface#remove
 * @description Detaches the handler from its target.
 * @memberof GlobalListenerInterface
 */

/**
 * @function GlobalListenerInterface#when
 * @description Attaches or detaches based on if the passed value is truthy
 * @memberof GlobalListenerInterface
 */

/**
 * Attaches an event handler outside directly to the `document`,
 * bypassing the react synthetic event system.
 *
 * @function useGlobalListener
 * @param {string}  eventName Name of the DOM event to listen for.
 * @param {Function}listener  An event handler
 * @param {boolean} [capture=false]   Whether or not to listen during the capture event phase
 * @param {Ref} [ownerElementRef] Ref to element to listen to instead of document
 * @example
 * useGlobalListener('keydown', (event) => {
 *  console.log(event.key)
 * });
 */
export default function useGlobalListener (eventName, listener, capture = false, ownerElementRef = null) {
  const targetRef = useRef(null);
  const prehandler = useEventCallback(listener);
  const handler = useEventCallback((e, ...args) => {
    // Check if this event is the event at bind time to avoid triggering handlers immediately
    // https://github.com/facebook/react/issues/20074
    if (targetRef.current && e === targetRef.current.currentEvent) {
      targetRef.current.currentEvent = undefined;
      return;
    }

    prehandler(e, ...args);
  });

  const remove = useCallback(() => {
    if (!targetRef.current) return;
    const { target, eventName: _event, capture: _capture } = targetRef.current;
    target.removeEventListener(_event, handler, _capture);
    targetRef.current = null;
  }, [ handler ]);

  useEffect(() => {
    const target = resolveRef(ownerElementRef)?.ownerDocument || document;

    if (targetRef.current) remove();

    targetRef.current = {
      target, eventName, capture, currentEvent: window.event,
    };
    target.addEventListener(eventName, handler, capture);

    return remove;
  }, [ eventName, handler, capture, ownerElementRef, remove ]);
}


/**
 * Similar to useGlobalListener, but only binds to the target when told to.
 * Returns an object containing `remove`, `attach`, and `when` functions.
 * `when` will attach as long as the provided value is truthy.
 *
 * @function useToggledGlobalListener
 * @param  {string}    eventName          Name of the DOM event to listen for.
 * @param  {Function}  listener           An event handler
 * @param  {boolean}   [capture=false]    Whether or not to listen during the capture event phase
 * @param  {Ref}       [ownerElementRef]  Ref of an element in the document to be bound to.
 * @returns {GlobalListenerInterface}
 */
export function useToggledGlobalListener (
  eventName,
  listener,
  capture = false,
  ownerElementRef = null
) {
  const targetRef = useRef(null);
  const prehandler = useEventCallback(listener);
  const handler = useEventCallback((e, ...args) => {
    // Check if this event is the event at bind time to avoid triggering handlers immediately
    // https://github.com/facebook/react/issues/20074
    if (targetRef.current && e === targetRef.current.currentEvent) {
      targetRef.current.currentEvent = undefined;
      return;
    }

    prehandler(e, ...args);
  });

  const api = useMemo(() => ({
    remove () {
      if (!targetRef.current) return;
      const { target, eventName: _event, capture: _capture } = targetRef.current;
      target.removeEventListener(_event, handler, _capture);
      targetRef.current = null;
    },

    attach () {
      const target = resolveRef(ownerElementRef)?.ownerDocument || document;

      if (targetRef.current) api.remove();

      targetRef.current = {
        target, eventName, capture, currentEvent: window.event,
      };
      target.addEventListener(eventName, handler, capture);
    },

    when (value) {
      if (value && !targetRef.current) api.attach();
      else if (!value && targetRef.current) api.remove();
    },
  }), [ capture, eventName, handler, ownerElementRef ]);

  useEffect(() => {
    // do not bind immediately, but if we're already bound we need to refresh.
    if (targetRef.current) {
      api.remove();
      api.attach();
    }

    return api.remove;
  }, [ eventName, handler, capture, ownerElementRef, api ]);

  return api;
}

/**
 * Shortcut for useGlobalListener against the window
 *
 * @param {string}   eventName Event to listen for
 * @param {Function} listener Callback function
 * @param {boolean}  [capture=false] Capture events from the top of the DOM tree
 * @returns {void}
 */
export function useWindowEventListener (eventName, listener, capture) {
  return useGlobalListener(eventName, listener, capture, window);
}

/**
 * Shortcut for useGlobalListener against the document
 *
 * @function useDocumentEventListener
 * @param {string}   eventName Event to listen for
 * @param {Function} listener Callback function
 * @param {boolean}  [capture=false] Capture events from the top of the DOM tree
 * @returns {void}
 */
export function useDocumentEventListener (eventName, listener, capture) {
  return useGlobalListener(eventName, listener, capture, document);
}
