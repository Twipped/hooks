
import { useMemo, useRef } from 'react';
import useWillUnmount from './useWillUnmount.js';
import useEventCallback from './useEventCallback.js';
import useWhenElementRefReady from './useWhenElementRefReady.js';
import { assert } from '@twipped/utils';

/**
 * @typedef {object} Ref
 * @property {*} current The contents of the ref
 */

/**
 * @typedef {object} HandlerAPI
 * @function attach Attaches the handler to a new target.
 * @function remove Detaches the handler from the current target
 */

/**
 * Attaches an event handler to a specified DOM element, bypassing the react synthetic event system.
 * Handler is automatically cleaned up when the calling component unmounts.
 *
 * @param {string}   event    Name of the DOM event to listen for.
 * @param {Function} listener An event handler
 * @param {boolean}  capture  Whether or not to listen during the capture event phase
 * @returns {HandlerAPI} The attachment interface
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

      if ('current' in target) target = target.current;
      assert(typeof target !== 'function', 'useEventHandler cannot take refs as functions.');
      assert(typeof target.addEventListener === 'function', 'Did not receive a valid DOM element.');

      targetRef.current = { target, event, capture };
      target.addEventListener(event, handler, capture);
    },
  }));

  useWillUnmount(api.remove);

  return api;
}

/**
 * Functions identical to useEventHandler, but takes a React Ref object as its first argument
 *
 * @param  {Ref} ref            Target ref to attach to, when ready.
 * @param  {string} event       Name of the DOM event to listen for.
 * @param  {Function} listener  An event handler
 * @param  {boolean} capture    Whether or not to listen during the capture event phase
 * @returns {void}
 */
export function useEventHandlerOn (ref, event, listener, capture = false) {

  assert('current' in ref, 'Did not receive a valid ref.');

  const { attach, remove } = useEventHandler(event, listener, capture);

  useWhenElementRefReady(ref, (el) => {
    if (el instanceof Element) {
      attach(el);
      return remove;
    }
  });

}
