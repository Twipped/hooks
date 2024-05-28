[**@twipped/hooks**](../../README.md) • **Docs**

***

# Function: useAsyncEffect()

> **useAsyncEffect**(`effect`, `dependencies`, `options`?): `void`

Identical to useEffect, except the effect can be an async function, the returned
disposer may be async, and it supports deep dependency comparison.

## Parameters

• **effect**: [`AsyncEffectCallback`](../type-aliases/AsyncEffectCallback.md)

The function to execute after render.

• **dependencies**: `any`

An object or array of values to compare for changes.

• **options?**= `{}`

• **options.comparison?**: [`Comparison`](../type-aliases/Comparison.md)= `false`

The comparison function used to detect if
the dependencies change. Defaults to a shallow equal, pass true to use deep equality.

## Returns

`void`

## Function

useAsyncEffect

## Example

```ts
import useAsyncEffect from '@zenbusiness/application-commons-hooks/useAsyncEffect';
function MyComponent ({ someProp }) {
  useAsyncEffect(async () => {
    await somethingThatReturnsAPromise(someProp);
  }, [someProp]);
  return null;
}
```

## Source

[hooks/useAsyncEffect.js:55](https://github.com/Twipped/hooks/blob/main/hooks/useAsyncEffect.js#L55)
