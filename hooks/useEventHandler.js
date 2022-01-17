
import { useMemo, useCallback, useRef } from 'react';
import useWillUnmount from './useWillUnmount';
import useEventCallback from './useEventCallback';
import useWhenElementRefReady from './useWhenElementRefReady';
import { assert } from '@twipped/utils';

/**
 * Attaches an event handler outside directly to specified DOM element
 * bypassing the react synthetic event system.
 *
 * @param element The target to listen for events on
 * @param event The DOM event name
 * @param handler An event handler
 * @param capture Whether or not to listen during the capture event phase
 */
export default function useEventHandler (event, listener, capture = false) {
  const handler = useEventCallback(listener);
  const targetRef = useRef(null);

  const remove = useCallback(() => {
    if (!targetRef.current) return;
    const { target, event: _event, capture: _capture } = targetRef.current;
    target.removeEventListener(_event, handler, _capture);
    targetRef.current = null;
  }, [ handler ]);

  const attach = useCallback((target) => {
    if (targetRef.current) remove();

    if ('current' in target) target = target.current;
    assert(typeof target !== 'function', 'useEventHandler cannot take refs as functions.');
    assert(typeof target.addEventListener === 'function', 'Did not receive a valid DOM element.');

    targetRef.current = { target, event, capture };
    target.addEventListener(event, handler, capture);
  }, [ handler ]);

  useWillUnmount(remove);

  return useMemo(() => ({ attach, remove }), [ attach, remove ]);
}

export function useEventHandlerOn (ref, event, listener, capture) {

  assert('current' in ref, 'Did not receive a valid ref.');

  const { attach } = useEventHandler(event, listener, capture);

  useWhenElementRefReady(ref, () => {
    attach(ref);
  });

}
