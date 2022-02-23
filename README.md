@twipped/hooks
===

A collection of react hooks that I use in many of my rollup/react projects.

# API Reference

### [useAction](#useAction)
Shortcut callback wrapper for MobX actions


| Param | Type | Description |
| --- | --- | --- |
| fn | <code>function</code> | Callback function to wrap |
| dependencies | <code>Array</code> | Array of hook dependencies passed to useCallback |

**Returns**: <code>void</code>


### [useChildren](#useChildren)
Works much like useMemo, except based upon the component child structure.
Memoizes deeply against all descendant properties.


| Param | Type | Description |
| --- | --- | --- |
| children | <code>Children</code> | The react `children` property |
| factory | <code>function</code> | The function to evaluate at mount and whenever children changes. |

**Returns**: <code>any</code> - The last return value of the factory.


### [useChosenOne](#useChosenOne)
Tracks component instantiation and reports if the current component is the
first and/or last instance of the component. Useful for fullscreen effects such
as backdrops where you do not want multiple instances.


| Param | Type | Description |
| --- | --- | --- |
| channel | <code>string</code> \| <code>symbol</code> | The name/category of the component to be tracked. |

**Returns**: [<code>ChosenStatus</code>](#ChosenStatus)


### [useClock](#useClock)
Triggers a component refresh at the interval checks passed in to the arguments.
Interval Checks are functions which compare the last tick value against the current
time and returns true if they have NOT changed within the interval, false
if they are in different intervals. Multiple checks may be passed to trigger at
different intervals.


| Param | Type | Description |
| --- | --- | --- |
| ...checks | <code>function</code> | Interval Check functions |

**Returns**: <code>Date</code> - Returns the time of the last interval tick.**Example**
```js
useClock(useClock.INTERVAL_SECONDS(10)) // ticks every ten seconds
useClock(useClock.INTERVAL_MINUTES(30)) // ticks every 30 minutes
useClock(useClock.INTERVAL_HOURS(2)) // ticks every 2 hours
useClock(useClock.SECONDS) // ticks once per second
useClock(useClock.MINUTES) // ticks at the top of each minute
useClock(useClock.HOURS) // ticks at the top of each hour
useClock(useClock.DAYS) // ticks at midnight
```



### [useCommittedRef](#useCommittedRef)
Creates a `Ref` whose value is updated in an effect, ensuring the most recent
value is the one rendered with. Generally only required for Concurrent mode usage
where previous work in `render()` may be discarded before being used.

This is safe to access in an event handler.


| Param | Type | Description |
| --- | --- | --- |
| value | [<code>Ref</code>](#Ref) | The `Ref` value |

**Returns**: <code>any</code> - The committed value


### [useComponentPosition](#useComponentPosition)
Retrieves the current page position of the element Ref passed.


| Param | Type | Description |
| --- | --- | --- |
| ref | [<code>Ref</code>](#Ref) | React ref (from createRef or useRef) that will contain an element reference. |
| [onUpdate] | <code>function</code> | Optional function to fire when the position changes. |

**Returns**: [<code>Position</code>](#Position) - `top` and `left` properties, relative to the top left of the document. `width` and `height` of the element.


### [useComputed](#useComputed)
Produces a MobX computed observable that invalidates when the dependencies change


| Param | Type | Description |
| --- | --- | --- |
| fn | <code>function</code> | Factory function for generating the observable. |
| dependencies | <code>Array</code> | Dependencies array |
| [options] | <code>object</code> | Behavioral options |
| options.comparison | <code>function</code> \| <code>boolean</code> | A comparison method, false for shallow equality, or true for deep equality |

**Returns**: <code>Observable.&lt;\*&gt;</code> - Returns a MobX Observable containing the derived values


### [useDerivedState](#useDerivedState)
Creates a state hook populated by a value derived from dependencies.
If the dependencies change, the state will be repopulated based on the new dependencies, IF the results differ.
Invoking setState.reset() will change the state back to the last derived value.


| Param | Type | Description |
| --- | --- | --- |
| fn | <code>function</code> | Handler to run at initialization and when a dependency changes |
| deps | <code>Array</code> | A dependency array |
| comparator | <code>function</code> | A function to evaluate if the result of the handler differs from current state |

**Returns**: [<code>StateHookInterface</code>](#StateHookInterface) - Returns an array containing the current state, an updater function and a getter function.


### [useEmotion](#useEmotion)
Takes a style definition and passes it through the Emotion css engine.


| Param | Type | Description |
| --- | --- | --- |
| stylesElement | <code>string</code> \| <code>object</code> \| <code>function</code> | Style definition |

**Returns**: <code>object</code> - Collection of scoped css classes, keyed to their original names


### [useEventCallback](#useEventCallback)
Wraps a callback so that the most recent version is always the one invoked.


| Param | Type | Description |
| --- | --- | --- |
| fn | <code>function</code> | The callback to wrap |

**Returns**: <code>function</code> - The stable wrapped callback


### [useEventHandler](#useEventHandler)
Attaches an event handler to a specified DOM element, bypassing the react synthetic event system.
Handler is automatically cleaned up when the calling component unmounts.


| Param | Type | Description |
| --- | --- | --- |
| event | <code>string</code> | Name of the DOM event to listen for. |
| listener | <code>function</code> | An event handler |
| capture | <code>boolean</code> | Whether or not to listen during the capture event phase |

**Returns**: [<code>EventHandlerInterface</code>](#EventHandlerInterface) - The attachment interface


### [useEventHandlerOn](#useEventHandlerOn)
Functions identical to useEventHandler, but takes a React Ref object as its first argument


| Param | Type | Description |
| --- | --- | --- |
| ref | [<code>Ref</code>](#Ref) | Target ref to attach to, when ready. |
| event | <code>string</code> | Name of the DOM event to listen for. |
| listener | <code>function</code> | An event handler |
| capture | <code>boolean</code> | Whether or not to listen during the capture event phase |

**Returns**: <code>void</code>


### [useForceUpdate](#useForceUpdate)
Returns a function that triggers a component update. the hook equivalent to
`this.forceUpdate()` in a class component. In most cases using a state value directly
is preferable but may be required in some advanced usages of refs for interop or
when direct DOM manipulation is required.

**Returns**: <code>function</code> - Returns a forceUpdate function.**Example**
```js
const forceUpdate = useForceUpdate();

const updateOnClick = useCallback(() => {
 forceUpdate()
}, [forceUpdate])

return <button type="button" onClick={updateOnClick}>Hi there</button>
```



### [useGettableState](#useGettableState)
Functions identical to useState, except the state is retrievable
via a callback passed as the third return element. This always returns
the current state regardless of where we are in the render process.


| Param | Type | Description |
| --- | --- | --- |
| initial | <code>any</code> | Default value passed to useState |
| options | <code>object</code> |  |
| options.alwaysMerge | <code>boolean</code> | [description] |
| options.alwaysUpdate | <code>boolean</code> | [description] |
| options.comparison | <code>boolean</code> \| <code>function</code> | } When alwaysUpdate is false, the comparison function provided will evaluate if the new state differs from the old state. Pass true to perform a deep equal, otherwise the comparison will be shallow. |

**Returns**: [<code>StateHookInterface</code>](#StateHookInterface) - A three item array containing: state, setState, getState


### [useWindowEventListener](#useWindowEventListener)
Shortcut for useGlobalListener against the window


| Param | Type |
| --- | --- |
| eventName | <code>string</code> |
| listener | <code>function</code> |
| capture | <code>boolean</code> |

**Returns**: <code>void</code>


### [useDocumentEventListener](#useDocumentEventListener)
Shortcut for useGlobalListener against the document


| Param | Type |
| --- | --- |
| eventName | <code>string</code> |
| listener | <code>function</code> |
| capture | <code>boolean</code> |

**Returns**: <code>void</code>


### [useGlobalListener](#useGlobalListener)
Attaches an event handler outside directly to the `document`,
bypassing the react synthetic event system.


| Param | Type | Description |
| --- | --- | --- |
| eventName | <code>string</code> | Name of the DOM event to listen for. |
| listener | <code>function</code> | An event handler |
| [capture] | <code>boolean</code> | Whether or not to listen during the capture event phase |
| [ownerElementRef] | [<code>Ref</code>](#Ref) |  |

**Example**
```js
useGlobalListener('keydown', (event) => {
 console.log(event.key)
});
```



### [useToggledGlobalListener](#useToggledGlobalListener)
Similar to useGlobalListener, but only binds to the target when told to.
Returns an object containing `remove`, `attach`, and `when` functions.
`when` will attach as long as the provided value is truthy.


| Param | Type | Description |
| --- | --- | --- |
| eventName | <code>string</code> | Name of the DOM event to listen for. |
| listener | <code>function</code> | An event handler |
| [capture] | <code>boolean</code> | Whether or not to listen during the capture event phase |
| [ownerElementRef] | [<code>Ref</code>](#Ref) | Ref of an element in the document to be bound to. |

**Returns**: <code>GlobalListenerInterface</code>


### [useImmediateUpdateEffect](#useImmediateUpdateEffect)
A synchronous effect that evaluates only when its dependency array changes.
This is helpful for reacting to prop changes. Note that state updates within this function
will trigger an error from react.


| Param | Type |
| --- | --- |
| effect | <code>function</code> |
| dependencies | <code>Array</code> |

**Example**
```js
js
function Example({ value }) {
  const [intermediaryValue, setValue] = useState(value);

  useImmediateUpdateEffect(() => {
    setTimeout(() => setValue(value));
  }, [value])
```



### [useIncrementer](#useIncrementer)
Returns an integer that increments any time the passed value changes


| Param | Type | Description |
| --- | --- | --- |
| value | <code>any</code> | Value to watch for changes |
| step | <code>number</code> | Amount to increment by. |

**Returns**: <code>number</code> - The incrementing value


### [useIsTransitioning](#useIsTransitioning)
Returns true if the target element is currently animating a css transition


| Param | Type | Description |
| --- | --- | --- |
| elementRef | <code>Ref.&lt;Element&gt;</code> |  |
| [selector] | <code>string</code> | Optional css selector to specify the animation delegate |

**Returns**: <code>boolean</code>


### [useIsomorphicEffect](#useIsomorphicEffect)
Resolves to useEffect when "window" is not in scope and useLayoutEffect in the browser


| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | Callback function to be called on mount |




### [useLazyRef](#useLazyRef)
Exactly the same as `useRef` except it accepts a function to produce the initial value.
Useful when the default is relatively costly to construct.


| Param | Type | Description |
| --- | --- | --- |
| fn | <code>function</code> \| <code>\*</code> | A function to execute on ref initialization. |

**Returns**: [<code>Ref</code>](#Ref)


### [useLocalStorage](#useLocalStorage)
Creates a state store that is connected to the browser localStorage


| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | Name of the key to store the value into |
| defaultValue | <code>any</code> | The initial value to use if the key does not exist. |

**Returns**: [<code>StateHookInterface</code>](#StateHookInterface) - A three item array containing: state, setState, getState


### [useSessionStorage](#useSessionStorage)
Creates a state store that is connected to the browser sessionStorage


| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | Name of the key to store the value into |
| defaultValue | <code>any</code> | The initial value to use if the key does not exist. |

**Returns**: [<code>StateHookInterface</code>](#StateHookInterface) - A three item array containing: state, setState, getState


### [useMakeObservable](#useMakeObservable)
Takes any value and makes it into a mobx observable. If the input value
changes, then the observable is invalidated and replaced.


| Param | Type |
| --- | --- |
| input | <code>any</code> |

**Returns**: <code>Observable.&lt;\*&gt;</code>


### [useMap](#useMap)
Create and return a [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)
that triggers rerenders when it is updated.


| Param | Type | Description |
| --- | --- | --- |
| ...args | <code>any</code> | initial Map entries |

**Returns**: <code>Map</code>**Example**
```js
const customerAges = useMap<number>([
  ['john', 24],
  ['betsy', 25]
]);

return (
 <>
   {Array.from(ids, ([name, age]) => (
     <div>
       {name}: {age}. <button onClick={() => ids.delete(name)}>X</button>
     </div>
   )}
 </>
)
```



### [useMemoMapped](#useMemoMapped)
Memoizes the results of mapping a collection (array, object, map, set) per value,
thus if the collection is changed, only the values that change will be recomputed.


| Param | Type | Description |
| --- | --- | --- |
| collection | <code>object</code> \| <code>Map</code> \| <code>Set</code> \| <code>Array</code> |  |
| predicate | <code>function</code> \| <code>object</code> \| <code>string</code> | A function or iteratee identity (key name, or truthy evaluating pairing) |

**Returns**: <code>object</code> \| <code>Map</code> \| <code>Set</code> \| <code>Array</code>


### [useMemoObject](#useMemoObject)
Memoizes a passed object so that the same object is always returned
as long as all of its properties are unchanged. This is useful for
objects passed as component props, so that child components will not re-render
because a parent component rendered and produced a new object. Most
notably, this is needed to prevent context providers from triggering
downstream updates every time they render.


| Param | Type | Description |
| --- | --- | --- |
| obj | <code>object</code> | The object to memoize. |

**Returns**: <code>object</code> - The first instance of the object passed.


### [useMergedRefs](#useMergedRefs)
Creates a single callback ref composed from two other Refs.


| Param | Type | Description |
| --- | --- | --- |
| ...refs | [<code>Ref</code>](#Ref) | Two or more callback or mutable Refs |

**Returns**: <code>function</code>**Example**
```js
const Button = React.forwardRef((props, ref) => {
  const [element, attachRef] = useCallbackRef<HTMLButtonElement>();
  const mergedRef = useMergedRefs(ref, attachRef);

  return <button ref={mergedRef} {...props}/>
})
```



### [useMounted](#useMounted)
Track whether a component is current mounted. Generally less preferable than
properly canceling effects so they don't run after a component is unmounted,
but helpful in cases where that isn't feasible, such as a `Promise` resolution.

**Returns**: <code>function</code> - Function that returns the current isMounted state of the component**Example**
```js
js
const [data, setData] = useState(null)
const isMounted = useMounted()

useEffect(() => {
  fetchdata().then((newData) => {
     if (isMounted()) {
       setData(newData);
     }
  })
})
```



### [useObservable](#useObservable)
Observes the passed mobx observable and triggers an update if it changes.


| Param | Type | Description |
| --- | --- | --- |
| observable | [<code>Observable</code>](#Observable) | The observable to monitor |
| [onChange] | <code>function</code> | Optional callback to fire when a change happens. |




### [usePageFocus](#usePageFocus)
State hook which tracks if the current window is focused.


| Param | Type | Description |
| --- | --- | --- |
| [options] | <code>object</code> |  |
| [options.onChange] | <code>function</code> | Optional callback to be invoked when the state changes. |
| [options.update] | <code>boolean</code> | Controls if the component should update when the state changes. Defaults to true. |
| [options.ownerElementRef] | <code>Ref.&lt;Element&gt;</code> | Ref of an element in the document to be monitored. |

**Returns**: <code>Array.&lt;boolean, function(), function()&gt;</code> - Focus state, a function to focus the window, and a function to get the focus state.


### [usePageHash](#usePageHash)
State hook that tracks the page hash (#), triggering an update if it changes.

**Returns**: <code>string</code> - The contents of the url hash, minus the leading hash symbol.


### [usePrevious](#usePrevious)
Always returns the value that was defined during the previous render,
storing the current value for the next render


| Param | Type |
| --- | --- |
| value | <code>any</code> |
| initialDefault | <code>any</code> |

**Returns**: <code>any</code>


### [usePromisedState](#usePromisedState)
Creates a state hook populated by a value produced by a promise returning function.
If the dependencies change, the function will be re-run, and IF the results differ then the state will be updated.
Invoking setState.reset() will re-evaluate the function and force update with the results.
Note: State will always be empty at initial invocation until the promise resolves.


| Param | Type | Description |
| --- | --- | --- |
| fn | <code>function</code> | Handler to run at initialization and when a dependency changes |
| dependencies | <code>Array</code> | A dependency array |
| options | <code>object</code> |  |
| options.comparator | <code>function</code> | A function to evaluate if the result of the handler differs from current state |
| options.skipFirst | <code>boolean</code> | Should the state me fetched on first render |
| options.initial | <code>any</code> | Default value of the state before first fetch. |

**Returns**: <code>PromisedState</code>


### [usePropsMemo](#usePropsMemo)
Functionally identical to useMemo, except it takes a dependency object
instead of an array (presumably a components props argument).


| Param | Type | Description |
| --- | --- | --- |
| factory | <code>function</code> |  |
| props | <code>object</code> |  |
| [options] | <code>object</code> |  |
| [options.comparison] | <code>boolean</code> | The comparison function used to detect if the dependencies change. Defaults to a shallow equal, pass true to use deep equality. |

**Returns**: <code>any</code> - The result of the factory function.


### [useProxyRef](#useProxyRef)
Creates a Ref object that triggers a function when its contents change.


| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> |  |
| [options.onChange] | <code>function</code> | The function to trigger on change. Receives the new value of the ref. If a function is returned, it will be invoked at next change, like useEffect. |
| [options.deferred] | <code>boolean</code> | If true, the function will be triggered asynchronously |
| [options.defaultValue] | <code>any</code> | The initial value of the ref. |

**Returns**: [<code>Ref</code>](#Ref)


### [useScroll](#useScroll)
Hook to tween the scroll position of an overflow:scroll element.


| Param | Type | Description |
| --- | --- | --- |
| ref | <code>Ref.&lt;Element&gt;</code> | The target element. |
| [baseOptions] | <code>object</code> |  |
| [baseOptions.duration] | <code>number</code> | Duration of the animation, in milliseconds |
| [baseOptions.top] | <code>number</code> | Target scrollTop value. |
| [baseOptions.left] | <code>number</code> | Target scrollLeft value. |
| [baseOptions.easing] | <code>function</code> | Easing function to use for the animation. |

**Returns**: <code>function</code>**Example**
```js
const ref = useRef();
const refScroll = useSroll(ref);
const scrollToTop = useCallback(() => refScroll({ top: 0, duration: 500 }))

return <div style={{ overflow: scroll }} ref={ref} onClick={scrolltoTop} />;
```



### [useSet](#useSet)
Create and return a [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)
that triggers rerenders when it's updated.


| Param | Type | Description |
| --- | --- | --- |
| ...args | <code>any</code> | initial Set values |

**Returns**: <code>Set</code>**Example**
```js
const ids = useSet([1,2,3,4]);

return (
 <>
   {Array.from(ids, id => (
     <div>
       id: {id}. <button onClick={() => ids.delete(id)}>X</button>
     </div>
   )}
 </>
)
```



### [useSilentState](#useSilentState)
Identical to `useState` _except_ that it does not trigger an update when
the state is updated.


| Param | Type | Description |
| --- | --- | --- |
| initial | <code>any</code> | The initial value to set the state to. |
| dependencies | <code>Array</code> | A dependency array. If provided, the state will be reset to the passed initial value if a dependency changes. |

**Returns**: [<code>StateHookInterface</code>](#StateHookInterface) - A three item array containing: state, setState, getState


### [useSmartEffect](#useSmartEffect)
Identical to useEffect, except dependencies may be compared deeply.


| Param | Type | Description |
| --- | --- | --- |
| effect | <code>function</code> | The function to execute after render. |
| dependencies | <code>object</code> | An object or array of values to compare for changes. |
| options | <code>object</code> |  |
| options.comparison | <code>boolean</code> | The comparison function used to detect if the dependencies change. Defaults to a shallow equal, pass true to use deep equality. |

**Returns**: <code>void</code>


### [useStableCallback](#useStableCallback)
Identical to `useCallback` _except_ that it provides a semantic guarantee that
function will not be invalidated unless the dependencies change. Dependencies may
be an array or an object.


| Param | Type | Description |
| --- | --- | --- |
| fn | <code>function</code> | A function that returns a value to be memoized |
| dependencies | <code>Array</code> | A dependency array |
| options | <code>object</code> |  |
| options.comparison | <code>boolean</code> | The comparison function used to detect if the dependencies change. Defaults to a shallow equal, pass true to use deep equality. |

**Returns**: <code>function</code>


### [useStableMemo](#useStableMemo)
Identical to `useMemo` _except_ that it provides a semantic guarantee that
values will not be invalidated unless the dependencies change. This is unlike
the built in `useMemo` which may discard memoized values for performance reasons.


| Param | Type | Description |
| --- | --- | --- |
| factory | <code>function</code> | A function that returns a value to be memoized |
| dependencies | <code>Array</code> | A dependency array |
| options | <code>object</code> |  |
| options.comparison | <code>boolean</code> | The comparison function used to detect if the dependencies change. Defaults to a shallow equal, pass true to use deep equality. |

**Returns**: <code>any</code>


### [useTimeout](#useTimeout)
Returns a controller object for setting a timeout that is properly cleaned up
once the component unmounts. New timeouts cancel and replace existing ones.


| Param | Type | Description |
| --- | --- | --- |
| [fn] | <code>function</code> | A base function for the timeout. |

**Returns**: [<code>TimeoutHandler</code>](#TimeoutHandler)**Example**
```js
const { set, clear } = useTimeout();
const [hello, showHello] = useState(false);

//Display hello after 5 seconds
set(() => showHello(true), 5000);
return (
  <div className="App">
    {hello ? <h3>Hello</h3> : null}
  </div>
);
```



### [useDefer](#useDefer)
Returns a controller object for performing a UI deferred task that is properly cleaned up
if the component unmounts before the task complete. New deferrals cancel and replace existing ones.


| Param | Type | Description |
| --- | --- | --- |
| [fn] | <code>function</code> | A base function for the timeout. |

**Returns**: [<code>TimeoutHandler</code>](#TimeoutHandler)**Example**
```js
const { set, clear } = useDefer();
const [hello, showHello] = useState(false);
//Display hello after 5 seconds
set(() => showHello(true));
return (
  <div className="App">
    {hello ? <h3>Hello</h3> : null}
  </div>
);
```



### [useInterval](#useInterval)
Creates an interval timer that is properly cleaned up when a component is unmounted


| Param | Type | Description |
| --- | --- | --- |
| fn | <code>function</code> | A function run on each interval |
| ms | <code>number</code> | The milliseconds duration of the interval. Set to 0 to loop on animation frames. |

**Returns**: [<code>IntervalHandler</code>](#IntervalHandler)**Example**
```js
const [timer, setTimer] = useState(-1)
 useInterval(() => setTimer(i => i + 1), 1000, false, true)

 // will update to 0 on the first effect
 return <span>{timer} seconds past</span>
```



### [useDeferredLoop](#useDeferredLoop)
Creates an interval timer that loops on the UI thread update and is properly
cleaned up when a component is unmounted


| Param | Type | Description |
| --- | --- | --- |
| fn | <code>function</code> | A function run on each interval |

**Returns**: [<code>IntervalHandler</code>](#IntervalHandler)


### [useDebounce](#useDebounce)
Produces a function that will only invoke the wrapped callback once within
the delay window defined, regardless of how many invocations have occurred.
If the component unmounts mid-debounce, the invocation will be canceled.
The passed callback is wrapped in useEventCallback so that it is always
current across re-renders.


| Param | Type | Description |
| --- | --- | --- |
| fn | <code>function</code> |  |
| delay | <code>number</code> | Defaults to 100ms |
| maxDelay | <code>number</code> |  |

**Returns**: <code>function</code>


### [useDebouncedEffect](#useDebouncedEffect)
Similar to useEffect, except that the callback will only execute once within
the delay window defined, regardless of how many renders have occurred.
If the component unmounts mid-debounce, the invocation will be canceled.


| Param | Type | Description |
| --- | --- | --- |
| fn | <code>function</code> |  |
| delay | <code>number</code> | Defaults to 100ms |
| maxDelay | <code>number</code> |  |
| deps | <code>Array</code> | A dependency array to pass to useEffect |

**Returns**: <code>void</code>


### [useToggledState](#useToggledState)
Produces a state hook that can only hold a boolean value.
Provides callbacks for toggling, activating and deactivating the state.


| Param | Type |
| --- | --- |
| initial | <code>boolean</code> |

**Returns**: <code>ToggledState</code>


### [useTripWire](#useTripWire)
Returns false as long as the passed value remains falsy. Once the value becomes
truthy, the return will also become truthy and remain so until reset.


| Param | Type | Description |
| --- | --- | --- |
| value | <code>any</code> | The triggering value. |

**Returns**: <code>Array.&lt;boolean, function()&gt;</code> - Returns an array containing the current
value and a function to reset to false.


### [useUpdateEffect](#useUpdateEffect)
Runs an effect only when the dependencies have changed, skipping the
initial "on mount" run. Caution, if the dependency list never changes,
the effect is **never run**


| Param | Type | Description |
| --- | --- | --- |
| effect | <code>function</code> | An effect to run on mount |
| dependencies | <code>Array</code> |  |

**Returns**: <code>void</code>**Example**
```js
js
 const ref = useRef<HTMLInput>(null);

 // focuses an element only if the focus changes, and not on mount
 useUpdateEffect(() => {
   const element = ref.current?.children[focusedIdx] as HTMLElement

   element?.focus()

 }, [focusedIndex])
```



### [useUpdatedRef](#useUpdatedRef)
Returns a ref that is immediately updated with the new value


| Param | Type | Description |
| --- | --- | --- |
| value | <code>any</code> | The Ref value |

**Returns**: [<code>Ref</code>](#Ref)


### [useWhenElementRefReady](#useWhenElementRefReady)
Executes the passed function once the provided Ref resolves to a value.


| Param | Type |
| --- | --- |
| ref | [<code>Ref</code>](#Ref) |
| onResolved | <code>function</code> |

**Returns**: <code>any</code>


### [useWillMount](#useWillMount)
Executes the passed function only on mount, storing the result
and returning it during every render until unmounted.


| Param | Type |
| --- | --- |
| onMount | <code>function</code> |
| onWillUnmount | <code>function</code> |

**Returns**: <code>any</code> - Returns the result of the onMount function.


### [useWillUnmount](#useWillUnmount)
Attach a callback that fires when a component unmounts


| Param | Type | Description |
| --- | --- | --- |
| fn | <code>function</code> | Callback to execute when the component unmounts |

**Returns**: <code>void</code>


### [EventHandlerInterface.attach](#EventHandlerInterface-attach)
Attaches the handler to the provided target.


| Param | Type |
| --- | --- |
| target | <code>Element</code> |




### [EventHandlerInterface.remove](#EventHandlerInterface-remove)
Detaches the handler from its target.




### [GlobalListenerInterface.attach](#GlobalListenerInterface-attach)
Attaches the handler to its target.




### [GlobalListenerInterface.remove](#GlobalListenerInterface-remove)
Detaches the handler from its target.




### [GlobalListenerInterface.when](#GlobalListenerInterface-when)
Attaches or detaches based on if the passed value is truthy




### [PromisedState.get](#PromisedState-get)
**Returns**: <code>any</code> - The most recent result of the promise


### [PromisedState.set](#PromisedState-set)

| Param | Type | Description |
| --- | --- | --- |
| value | <code>any</code> | Overwrites the state |

**Returns**: <code>void</code>


### [PromisedState.reset](#PromisedState-reset)
Clears the state and reruns the promise factory.

**Returns**: <code>void</code>


### [TimeoutHandler.set](#TimeoutHandler-set)
Starts or resets the timeout


| Param | Type | Description |
| --- | --- | --- |
| [fn] | <code>function</code> | Callback to evaluate when the timeout finishes. If omitted, will fallback to the rootFn. |
| [delayMs] | <code>number</code> | Duration of the timeout. Defaults to 0 (next event loop). |
| [reset] | <code>boolean</code> | If a previous timeout should be reset when this is invoked. Default's to true. |




### [TimeoutHandler.clear](#TimeoutHandler-clear)
Clears the timeout




### [IntervalHandler.start](#IntervalHandler-start)
Starts or resets the interval loop


| Param | Type | Description |
| --- | --- | --- |
| [fn] | <code>function</code> | Callback to evaluate when the timeout finishes. If omitted, will fallback to the rootFn. |
| [delayMs] | <code>number</code> | Duration of the timeout. Defaults to 0 (next event loop). |
| [reset] | <code>boolean</code> | If a previous timeout should be reset when this is invoked. Default's to true. |




### [IntervalHandler.stop](#IntervalHandler-stop)
Aborts the interval loop




### [ToggledState.toggle](#ToggledState-toggle)
Toggles the state on or off based on current value


| Param | Type | Description |
| --- | --- | --- |
| [onoff] | <code>boolean</code> | Force a specific value. Will be ignored if value is not a boolean. |

**Returns**: <code>boolean</code>


### [ToggledState.on](#ToggledState-on)
Sets state to true

**Returns**: <code>void</code>


### [ToggledState.off](#ToggledState-off)
Sets state to false

**Returns**: <code>void</code>


### [ToggledState.toggle](#ToggledState-toggle)
Retreives the current state

**Returns**: <code>boolean</code>


### [useLocalStorage.keys](#useLocalStorage-keys)
Returns an array of the keys present in localStorage

**Returns**: <code>Array.&lt;string&gt;</code>


### [useSessionStorage.keys](#useSessionStorage-keys)
Returns an array of the keys present in sessionStorage

**Returns**: <code>Array.&lt;string&gt;</code>


