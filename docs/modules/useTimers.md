# Module: useTimers

## Table of contents

### Type Aliases

- [IntervalHandler](useTimers.md#intervalhandler)
- [TimeoutHandler](useTimers.md#timeouthandler)

### Functions

- [useDebounce](useTimers.md#usedebounce)
- [useDebouncedEffect](useTimers.md#usedebouncedeffect)
- [useDefer](useTimers.md#usedefer)
- [useDeferredLoop](useTimers.md#usedeferredloop)
- [useInterval](useTimers.md#useinterval)
- [useTimeout](useTimers.md#usetimeout)

## Type Aliases

### IntervalHandler

Ƭ **IntervalHandler**<\>: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `start` | { `Function`: (`fn`: `Function`, `delayMs`: `number`, `reset`: `boolean`) => `void`  } |
| `start.Function` | [object Object] |
| `stop` | { `Function`: `void`  } |
| `stop.Function` | `void` |

#### Defined in

[hooks/useTimers.js:164](https://github.com/Twipped/hooks/blob/f27aaa6/hooks/useTimers.js#L164)

___

### TimeoutHandler

Ƭ **TimeoutHandler**<\>: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `clear` | `Function` |
| `set` | { `Function`: (`fn`: `Function`, `delayMs`: `number`, `reset`: `boolean`) => `void`  } |
| `set.Function` | [object Object] |

#### Defined in

[hooks/useTimers.js:12](https://github.com/Twipped/hooks/blob/f27aaa6/hooks/useTimers.js#L12)

## Functions

### useDebounce

▸ **useDebounce**(`fn`, `delay?`, `maxDelay?`): `Function`

Produces a function that will only invoke the wrapped callback once within
the delay window defined, regardless of how many invocations have occurred.
If the component unmounts mid-debounce, the invocation will be canceled.
The passed callback is wrapped in useEventCallback so that it is always
current across re-renders.

**`Function`**

useDebounce

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `fn` | `Function` | `undefined` | Function to debounce |
| `delay` | `number` | `100` | How long to wait after last invocation, in milliseconds. Defaults to 100ms |
| `maxDelay` | `number` | `Infinity` | Maximum amount of time to wait, in milliseconds. |

#### Returns

`Function`

#### Defined in

[hooks/useTimers.js:256](https://github.com/Twipped/hooks/blob/f27aaa6/hooks/useTimers.js#L256)

___

### useDebouncedEffect

▸ **useDebouncedEffect**(`fn`, `delay?`, `maxDelay?`, `dependencies`): `void`

Similar to useEffect, except that the callback will only execute once within
the delay window defined, regardless of how many renders have occurred.
If the component unmounts mid-debounce, the invocation will be canceled.

**`Function`**

useDebouncedEffect

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `fn` | `Function` | `undefined` | Function to debounce |
| `delay?` | `number` | `100` | How long to wait after last invocation, in milliseconds. Defaults to 100ms |
| `maxDelay?` | `number` | `Infinity` | Maximum amount of time to wait, in milliseconds. |
| `dependencies` | `any`[] | `undefined` | A dependency array to pass to useEffect |

#### Returns

`void`

#### Defined in

[hooks/useTimers.js:296](https://github.com/Twipped/hooks/blob/f27aaa6/hooks/useTimers.js#L296)

___

### useDefer

▸ **useDefer**(`fn?`): [`TimeoutHandler`](useTimers.md#timeouthandler)

Returns a controller object for performing a UI deferred task that is properly cleaned up
if the component unmounts before the task complete. New deferrals cancel and replace
existing ones.

**`Function`**

useDefer

**`Example`**

```ts
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

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `fn?` | `Function` | A base function for the timeout. |

#### Returns

[`TimeoutHandler`](useTimers.md#timeouthandler)

#### Defined in

[hooks/useTimers.js:155](https://github.com/Twipped/hooks/blob/f27aaa6/hooks/useTimers.js#L155)

___

### useDeferredLoop

▸ **useDeferredLoop**(`fn`): [`IntervalHandler`](useTimers.md#intervalhandler)

Creates an interval timer that loops on the UI thread update and is properly
cleaned up when a component is unmounted

**`Function`**

useDeferredLoop

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `fn` | `Function` | A function run on each interval |

#### Returns

[`IntervalHandler`](useTimers.md#intervalhandler)

#### Defined in

[hooks/useTimers.js:237](https://github.com/Twipped/hooks/blob/f27aaa6/hooks/useTimers.js#L237)

___

### useInterval

▸ **useInterval**(`fn`, `ms?`): [`IntervalHandler`](useTimers.md#intervalhandler)

Creates an interval timer that is properly cleaned up when a component is unmounted

**`Function`**

useInterval

**`Example`**

```ts
const [timer, setTimer] = useState(-1)
 useInterval(() => setTimer(i => i + 1), 1000, false, true)

 // will update to 0 on the first effect
 return <span>{timer} seconds past</span>
```

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `fn` | `Function` | `undefined` | A function run on each interval |
| `ms` | `number` | `0` | The milliseconds duration of the interval. Pass 0 to loop on animation frames. |

#### Returns

[`IntervalHandler`](useTimers.md#intervalhandler)

#### Defined in

[hooks/useTimers.js:207](https://github.com/Twipped/hooks/blob/f27aaa6/hooks/useTimers.js#L207)

___

### useTimeout

▸ **useTimeout**(`fn?`): [`TimeoutHandler`](useTimers.md#timeouthandler)

Returns a controller object for setting a timeout that is properly cleaned up
once the component unmounts. New timeouts cancel and replace existing ones.

**`Function`**

useTimeout

**`Example`**

```ts
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

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `fn?` | `Function` | A base function for the timeout. |

#### Returns

[`TimeoutHandler`](useTimers.md#timeouthandler)

#### Defined in

[hooks/useTimers.js:129](https://github.com/Twipped/hooks/blob/f27aaa6/hooks/useTimers.js#L129)
