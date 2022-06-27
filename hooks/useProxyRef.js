
import useEventCallback from './useEventCallback.js';
import useStableMemo from './useStableMemo.js';

/**
 * Creates a Ref object that triggers a function when its contents change.
 *
 * @function useProxyRef
 * @param  {Object}    options
 * @param  {Function}  [options.onChange]   The function to trigger on change. Receives the new
 * value of the ref. If a function is returned, it will be invoked at next change, like useEffect.
 * @param  {boolean}   [options.deferred]   If true, the function will be triggered asynchronously
 * @param  {any}       [options.defaultValue]  The initial value of the ref.
 * @returns {Ref}
 */
export default function useProxyRef ({ onChange, deferred = false, defaultValue } = {}) {
  onChange = useEventCallback(onChange);
  return useStableMemo(() => {
    const ref = { current: defaultValue };
    var cleanup;
    const proxy = new Proxy(ref, {
      set (target, prop, value) {
        target[prop] = value;
        if (!onChange || prop !== 'current') return true;
        if (typeof cleanup === 'function') cleanup();
        if (deferred) {
          setTimeout(() => { cleanup = onChange(value); });
        } else {
          cleanup = onChange(ref.current);
        }

        return true;
      },
    });

    return proxy;
  });
}
