import useGettableState from './useGettableState.js';
import useStableMemo from './useStableMemo.js';

/**
 * @typedef {{
 *  state: boolean,
 *  toggle: (onoff: boolean) => boolean
 *  on: () => void
 *  off: () => void
 *  get: () => boolean
 * }} ToggledState
 * @description Toggled state API interface
 */

/**
 * Produces a state hook that can only hold a boolean value.
 * Provides callbacks for toggling, activating and deactivating the state.
 *
 * @function useToggledState
 * @param  {boolean} initial Initial state
 * @returns {ToggledState}
 */
export default function useToggledState (initial = false) {
  const [ , setter, getter ] = useGettableState(!!initial);

  return useStableMemo(() => ({

    /**
     * Returns the current state.
     *
     * @property {boolean} ToggledState#state The current state
     * @memberof ToggledState
     * @readonly
     * @returns {boolean}
     */
    get state () {
      return getter();
    },

    /**
     * Toggles the state on or off based on current value
     *
     * @function ToggledState#toggle
     * @memberof ToggledState
     * @param  {boolean} [onoff] Force a specific value. Will be ignored if value is not a boolean.
     * @returns {boolean}
     */
    toggle (onoff) {
      // eslint-disable-next-line no-param-reassign
      if (onoff !== true && onoff !== false) onoff = !getter();
      setter(onoff);
      return onoff;
    },

    /**
     * Sets state to true
     *
     * @memberof ToggledState
     * @function ToggledState#on
     * @returns {void}
     */
    on () {
      setter(true);
    },

    /**
     * Sets state to false
     *
     * @function ToggledState#off
     * @memberof ToggledState
     * @returns {void}
     */
    off () {
      setter(false);
    },

    /**
     * Retreives the current state
     *
     * @function ToggledState#toggle
     * @memberof ToggledState
     * @returns {boolean}
     */
    get: getter,
  }), []);
}
