
import { useEffect, useRef, useCallback } from 'react';
import useEventCallback from './useEventCallback';

const getRefTarget = (ref) => ref && ('current' in ref ? ref.current : ref);


export function useWindowEventListener (eventName, listener, capture) {
  return useGlobalListener(eventName, listener, capture, window);
}

export function useDocumentEventListener (eventName, listener, capture) {
  return useGlobalListener(eventName, listener, capture, document);
}

/**
 * Attaches an event handler outside directly to the `document`,
 * bypassing the react synthetic event system.
 *
 * ```js
 * useGlobalListener('keydown', (event) => {
 *  console.log(event.key)
 * })
 * ```
 *
 * @param eventName The DOM event name
 * @param handler An event handler
 * @param capture Whether or not to listen during the capture event phase
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
    const target = getRefTarget(ownerElementRef)?.ownerDocument || document;

    if (targetRef.current) remove();

    targetRef.current = { target, eventName, capture, currentEvent: window.event };
    target.addEventListener(eventName, handler, capture);

    return remove;
  }, [ eventName, handler, capture, ownerElementRef ]);
}

export function useToggledGlobalListener (eventName, listener, capture = false, ownerElementRef = null) {
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

  const attach = useCallback(() => {
    const target = getRefTarget(ownerElementRef)?.ownerDocument || document;

    if (targetRef.current) remove();

    targetRef.current = { target, eventName, capture, currentEvent: window.event };
    target.addEventListener(eventName, handler, capture);
  }, [ handler, ownerElementRef, capture ]);

  const when_ = useCallback((value) => {
    if (value && !targetRef.current) attach();
    else if (!value && targetRef.current) remove();
  }, [ attach, remove ]);

  useEffect(() => {
    // do not bind immediately, but if we're already bound we need to refresh.
    if (targetRef.current) {
      remove();
      attach();
    }

    return remove;
  }, [ eventName, handler, capture, ownerElementRef ]);

  return { attach, remove, when: when_ };
}
