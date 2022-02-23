
import useGettableState from './useGettableState';
import useStableMemo from './useStableMemo';


/**
 * @typedef ToggledState
 * @description Toggled state API interface
 * @memberof useToggledState
 */

/**
 * Produces a state hook that can only hold a boolean value.
 * Provides callbacks for toggling, activating and deactivating the state.
 *
 * @function useToggledState
 * @param  {boolean} initial
 * @returns {ToggledState}
 */
export default function useToggledState (initial = false) {
  const [ state, setter, getter ] = useGettableState(!!initial);

  return useStableMemo(() => ({

    /**
     * @property {boolean} ToggledState#state
     * @memberof ToggledState
     * @readonly
     * @returns {boolean} The current state
     */
    get state () {
      return state;
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
  }));
}
