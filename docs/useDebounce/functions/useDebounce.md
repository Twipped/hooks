[**@twipped/hooks**](../../README.md) • **Docs**

***

# Function: useDebounce()

> **useDebounce**\<`T`\>(`fn`, `delay`, `maxDelay`): `T`

Produces a function that will only invoke the wrapped callback once within
the delay window defined, regardless of how many invocations have occurred.
If the component unmounts mid-debounce, the invocation will be canceled.
The passed callback is wrapped in useEventCallback so that it is always
current across re-renders.

## Type parameters

• **T** *extends* `Function`

## Parameters

• **fn**: `T`

Function to debounce

• **delay**: `number`= `100`

How long to wait after last invocation, in
milliseconds. Defaults to 100ms

• **maxDelay**: `number`= `Infinity`

Maximum amount of time to wait, in milliseconds.

## Returns

`T`

## Function

useDebounce

## Example

```ts
import { useState } from 'react';
import useDebounce from '@zenbusiness/application-commons-hooks/useDebounce';
function MyComponent () {
  const [position, setPosition] = useState({});
  const onMove = useDebounce((ev) => {
    const { clientX: x, clientY: y } = ev;
    setPosition({ x, y });
  }, 50, 200);
  return <div onMouseMove={onMouseMove}>X: {position.x}, Y: {position.y}</div>;
}
```

## Source

[hooks/useDebounce.js:32](https://github.com/Twipped/hooks/blob/main/hooks/useDebounce.js#L32)
