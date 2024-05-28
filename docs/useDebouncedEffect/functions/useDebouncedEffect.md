[**@twipped/hooks**](../../README.md) • **Docs**

***

# Function: useDebouncedEffect()

> **useDebouncedEffect**(`fn`, `delay`?, `maxDelay`?, `dependencies`?, `options`?): `void`

Similar to useEffect, except that the callback will only execute once within
the delay window defined, regardless of how many renders have occurred.
If the component unmounts mid-debounce, the invocation will be canceled.

Note, this does NOT support returning a disposer function.

## Parameters

• **fn**: `EffectCallback`

Function to debounce

• **delay?**: `number`= `100`

How long to wait after last invocation, in
milliseconds. Defaults to 100ms

• **maxDelay?**: `number`= `Infinity`

Maximum amount of time to wait, in milliseconds.

• **dependencies?**: `any`= `undefined`

A dependency array to pass to useEffect

• **options?**= `{}`

• **options.comparison?**: [`Comparison`](../../useAsyncEffect/type-aliases/Comparison.md)= `false`

The comparison function used to detect if
the dependencies change. Defaults to a shallow equal, pass true to use deep equality.

## Returns

`void`

## Function

useDebouncedEffect

## Example

## Source

[hooks/useDebouncedEffect.js:33](https://github.com/Twipped/hooks/blob/main/hooks/useDebouncedEffect.js#L33)
